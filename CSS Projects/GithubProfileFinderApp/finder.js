const form=document.getElementById("search-form");
const searchInput=document.getElementById("search-input");
const profileContainer=document.getElementById("profile-container");
const reposContainer=document.getElementById("repos-container");

form.addEventListener("submit",getProfile);

async function getProfile(event){
    event.preventDefault();
    const username=searchInput.value.trim();
    if(username===""){
        alert("Please Enter a GitHub username");
        return;
    }
    profileContainer.innerHTML = "<h2>Loading profile...</h2>";
    reposContainer.innerHTML = "";
    const response=await fetch(`https://api.github.com/users/${username}`);
    if(!response.ok){
        profileContainer.innerHTML = `
    <div class="error">
        <h2>❌ User Not Found</h2>
        <p>Please check the username and try again.</p>
    </div>
`;
reposContainer.innerHTML = "";

        return;
    }
    const data=await response.json();
    profileContainer.innerHTML=`<div class="profile-card">
    <img src="${data.avatar_url}" alt="${data.login}">
    <div class="profile-info">
    <h2>${data.name || data.login}</h2>
    <p>${data.bio || "No Bio Available."}</p>
    <div class="stats">
    <div>
    <h3>${data.followers}</h3>
    <span>Followers</span>
    </div>
    <div>
    <h3>${data.following}</h3>
    <span>Following</span>
    </div>
    <div>
    <h3>${data.public_repos}</h3>
    <span>Repositoriies</span>
    </div>
    </div>
    <a href="${data.html_url}" target="_blank">
   🔗 View GitHub Profile
    </a>
    </div>
    </div>`;
    const repoResponse=await fetch(`https://api.github.com/users/${username}/repos`);
    if(!repoResponse.ok){
        alert("Unable to fetch repositories");
        return;
    }
    const repos= await repoResponse.json();
    reposContainer.innerHTML=``;

    repos.forEach(function(repo){
        const repoCard=document.createElement("div");
        repoCard.classList.add("repo-card");
        repoCard.innerHTML=`
        <h3>${repo.name}</h3>
        <p>${repo.description  || "No Description available."}</p>
        <div class="repo-details">
        <span> ⭐${repo.stargazers_count}</span>
        <span>${repo.forks_count}</span>
        <span>${repo.language  || "Not Specified"} </span>
        </div>
        <a href="${repo.html_url}" target="_blank">
        Open Repository
        </a>
        `;
        reposContainer.appendChild(repoCard);
    });
    searchInput.value="";
}