/*Select section */
/*We Will use this section to select all html elements we need  */
// login screen
const continueBtn=document.getElementById("continue-btn");
const loginScreen=document.getElementById("login-screen");
const appScreen=document.getElementById("app-screen");
const existingUsers=document.getElementById("existing-users");
const newUserInput=document.getElementById("new-user-input");
 

// main app screen
const currentUser=document.getElementById("current-user");
const taskInput=document.getElementById("task-input");
const prioritySelect=document.getElementById("priority-select");
const dueDate=document.getElementById("due-date");
const addTaskBtn=document.getElementById("add-task-btn");

const taskList=document.getElementById("task-list");
const searchInput=document.getElementById("search-input");
const progressFill=document.getElementById("progress-fill");
const progressText=document.getElementById("progress-text");
const emptyState=document.getElementById("empty-state");
const loginForm = document.getElementById("login-form");
const themeToggle=document.getElementById("theme-toggle");
const switchUserBtn=document.getElementById("switch-user-btn");
const logoutBtn=document.getElementById("logout-btn");

//current applicatin state
let users=[];//array of objects that will store different users
let currentUserName="";
let currentFilter="all";
let currentTheme="dark";
// creating the continue btn
//steps are  1.read the input 2.Validate it 3. save the current user 4.Show main app

loginForm.addEventListener("submit",handleContinue);

function handleContinue(event){
     event.preventDefault();
    const newUser=newUserInput.value.trim();
    const selectedUser=existingUsers.value;
    const existingUser=users.find(function(user){
        return user.name === newUser;
    });
   if(newUser!==""){
    if(existingUser){
        alert("User already exists.Please select the user from the dropdown");
        return;
    }
    createUser(newUser);
    loginUser(newUser);
    console.log(users);
   }
   else if(selectedUser!==""){
   loginUser(selectedUser);
   }
   else{
    alert("Please create or select a user");
   }
}


function createUser(userName) {

    const user = {
        name: userName,
        tasks: []
    };

    users.push(user);
    saveUsers();
    updateUserDropdown();

}


function loginUser(userName) {
    currentUserName = userName;
    currentUser.textContent = currentUserName;
    newUserInput.value = "";
existingUsers.value = "";
    loginScreen.classList.add("hidden");
    appScreen.classList.remove("hidden");
    renderTasks();
    updateProgress();
}


function updateUserDropdown(){
    existingUsers.innerHTML=`<option value="">Select a user</option>`;
    users.forEach(function(user){
existingUsers.innerHTML+= `<option value="${user.name}">${user.name}</option>`;
    });
}


logoutBtn.addEventListener("click",handleLogout);
function handleLogout(){
    currentUserName="";
    currentUser.textContent="";
    newUserInput.value="";
    existingUsers.value="";
    appScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
}
addTaskBtn.addEventListener("click",handleAddTask);

function handleAddTask(){
    const title=taskInput.value.trim();
    const priority=prioritySelect.value;
    const date=dueDate.value;
    if(title===""){
        alert("Please enter a task.");
        return;
    }
    console.log(title);
    console.log(priority);
    console.log(date);
    const user = users.find(function(user) {
    return user.name === currentUserName;
});
const task={
    id: Date.now(),
    title: title,
    priority: priority,
    dueDate: date,
    completed: false
};
user.tasks.push(task);
saveUsers();
renderTasks();
updateProgress();
taskInput.value = "";
prioritySelect.value = "Medium";
dueDate.value = "";
}


function renderTasks(){
const user=users.find(function(user){  //find the current user
    return user.name=== currentUserName;
});
const searchText=searchInput.value.toLowerCase();
taskList.innerHTML=``;
user.tasks.forEach(function(task,index){
    if(!task.title.toLowerCase().includes(searchText)){
        return;
    }
    if (currentFilter === "completed" && !task.completed) {
    return;
    }
  if (currentFilter === "pending" && task.completed) {
    return;
     }
   taskList.innerHTML += `
  <li class="task-card ${task.completed ? "completed" : ""}" data-index="${index}">
       <span class="priority-badge ${task.priority.toLowerCase()}">
        <span class="priority-dot"></span>
            ${task.priority.toUpperCase()}
        </span>
        <h3 class="task-title">
            ${task.title}
        </h3>
       <div class="task-footer">

    <span class="task-date">
        📅 ${formatDate(task.dueDate)}
    </span>
    <div class="task-actions">
        <button class="complete-btn">
            ✔
        </button>
        <button class="edit-btn">
            ✏
        </button>
        <button class="delete-btn">
            🗑
        </button>
    </div>
</div>
    </li>
`;
});
if(taskList.innerHTML === ""){
    emptyState.classList.remove("hidden");
} else {
    emptyState.classList.add("hidden");
}
}


taskList.addEventListener("click",handleTaskClick);
function handleTaskClick(event){
  if(event.target.classList.contains("delete-btn")){
    const taskCard = event.target.parentElement.parentElement.parentElement;
    const index= taskCard.dataset.index;
    const user = users.find(function(user){
    return user.name === currentUserName;
});
user.tasks.splice(index, 1);
saveUsers();
renderTasks();
updateProgress();
    console.log(index);//dataset stores all data-index and similar elements in it
    console.log("Delete button Clicked");
  }
  if (event.target.classList.contains("complete-btn")) {
    const taskCard = event.target.parentElement.parentElement.parentElement;
    const index = taskCard.dataset.index;
    const user = users.find(function(user) {
        return user.name === currentUserName;
    });
    user.tasks[index].completed = !user.tasks[index].completed;
    saveUsers();
    renderTasks();
    updateProgress();
}
if (event.target.classList.contains("edit-btn")) {

    const taskCard = event.target.parentElement.parentElement.parentElement;
    const index = taskCard.dataset.index;
    const user = users.find(function(user) {
        return user.name === currentUserName;
    });
    const task = user.tasks[index];
    taskInput.value = task.title;
    prioritySelect.value = task.priority;
    dueDate.value = task.dueDate;
    user.tasks.splice(index, 1);
    saveUsers();
    renderTasks();
}
}
searchInput.addEventListener("input",renderTasks);//input event  fires everytie the value changes
const filterButtons=document.querySelectorAll(".filter-btn");
filterButtons.forEach(function(button){
    button.addEventListener("click", handleFilter);
});


function handleFilter(event) {
    filterButtons.forEach(function(button) {
        button.classList.remove("active");
    });
    event.target.classList.add("active");
    currentFilter = event.target.dataset.filter;
    renderTasks();
}

function updateProgress(){
    const user = users.find(function(user) {
    return user.name === currentUserName;
});
const totalTasks=user.tasks.length;
const completedTask=user.tasks.filter(function(task){
    return task.completed;
}).length;

let percentage=0;
if(totalTasks>0){
    percentage=(completedTask/totalTasks)*100;
}
progressFill.style.width=percentage +"%";
progressText.textContent=`${completedTask} / ${totalTasks} Completed`;
}


function saveUsers(){     //key       value
    localStorage.setItem("users",JSON.stringify(users));   //local storage only stores string
}

function loadUsers(){
    const storedusers =localStorage.getItem("users");
    if(storedusers){
        users= JSON.parse(storedusers);
        updateUserDropdown();
    }
}

themeToggle.addEventListener("click",toggleTheme);
function toggleTheme(){
    document.body.classList.toggle("light-theme");
    if(document.body.classList.contains("light-theme")){
        localStorage.setItem("theme","light");
    }
    else{
        localStorage.setItem("theme","dark");
    }
}

function loadTheme(){
    const savedTheme=localStorage.getItem("theme");
    if(savedTheme==="light"){
        document.body.classList.add("light-theme");
    }
}
   switchUserBtn.addEventListener("click",handleSwitchUser);
   function handleSwitchUser(){
    currentUserName="";
    currentUser.textContent="";
    appScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    updateUserDropdown();
    newUserInput.value="";
    existingUsers.value="";
   }

function formatDate(dateString) {
    if (!dateString) {
        return "No Due Date";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

}
loadUsers();
loadTheme();