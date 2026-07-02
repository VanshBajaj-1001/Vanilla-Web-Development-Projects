const exploreBtn =document.querySelector(".explore-text");
const cardsSection=document.querySelector("#cards");
exploreBtn.addEventListener("click",()=>{
    cardsSection.scrollIntoView({
        behaviour: "smooth"
    });
});

//navigating cards
document.getElementById("science").addEventListener("click",() =>{
window.location.href="science.html";
} );
document.getElementById("ai").addEventListener("click",() =>{
window.location.href="ai.html";
} );
document.getElementById("sports").addEventListener("click",() =>{
window.location.href="sports.html";
} );
document.getElementById("music").addEventListener("click",() =>{
window.location.href="music.html";
} );
document.getElementById("literature").addEventListener("click",() =>{
window.location.href="literature.html";
} );
document.getElementById("space").addEventListener("click",() =>{
window.location.href="space.html";
} );
document.getElementById("cinema").addEventListener("click",() =>{
window.location.href="cinema.html";
} );document.getElementById("technology").addEventListener("click",() =>{
window.location.href="technology.html";
} );