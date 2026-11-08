//Global Array-purpoae of global array is to esnure that all functions in the file that are in the source code will have a the functions of the array
let myTaskManager=[];

//DOM elements
const taskform = document.getElementById("task-form");
const tasklistcontainer = document.getElementById("tasklistcontainer");
const searchBar= document.getElementById("search-bar");

// Restore saved Tasks from local storage and display them
function loadtasks(){
    const storedTasks=localStorage.getItem("myTaskManager");
    if(storedTasks){
      myTaskManager=JSON.parse(storedTasks);
    } else{
        myTaskManager=[];
    }

    renderTaskList(myTaskManager);
}

//Persist the current myTaskManager data as JSON in Localstorage

function saveTaskList(){
    localStorage.setItem("TheTaskList", JSON.stringify(myTaskManager));
}

//rebuilds the "cards" shown in localstorage

function renderTaskList(taskstoDisplay){
    tasklistcontainer.innerHTML= "";
    
    taskstoDisplay.forEach( (task) => {
        const card=document.createElement("div");
        card.classList.add("task-card");
        
        if(task.isComplete) card.classList.add("complete");

        card.innerHTML = `
        <div>
         <h3>${task.TaskName }</h3>
        <p> <strong>Description:</strong>${task.tasktitle}</p>
        <p> <strong>Duration:</strong>task.${task.TaskTime}</p>
        <p> <strong>Priority:</strong>${task.taskpriority} </p>
        <p> <strong>Status:</strong> ${task.isComplete ? "Completed": "Not Started"} </p>
        </div>
        <div class="task-card-container">
        <button class="toggle-btn" data-id="${task.id}">Toggle Status</button>
        <button class="delete-btn" data-id="${task.id}">Delete</button>
        </div>
        `;
        tasklistcontainer.appendChild(card);
    } );
}

//Add the submitted "TaskForm" value as a new book, then save it to local storage and display the info as the card after clicking the AddTask button
function handleAddTask(e){
    e.preventDefault();

    const TaskName=document.getElementById("TaskName").value;
    const TaskDescription=document.getElementById("tasktitle").value;
    const TaskTime=document.getElementById("TaskTime").value;
    const TaskImportance=document.getElementById("taskpriority").value;
    const Complete=document.getElementById("isComplete").checked;

    //create New (book) task object
    const newTask ={
        id: Date.now(),
        TaskName,
        tasktitle,
        TaskTime,
        taskpriority,
        isComplete,
    };

    //push to myTaskManager array
    myTaskManager.push(newTask);
    saveTaskList();
    renderTaskList(myTaskManager);

    taskform.reset();

}

//handle delete and is.Complete status using specific container click
function handleTaskClick(e){
    if(!e.target.matches("button")) return;
    const taskId= parseInt(e.target.dataset.id);
    if(e.target.classList.contains("delete-btn")){
        myTaskManager= myTaskManager.filter((task)=> task.id !== taskId);
    } else if(e.target.classList.contains("toggle-btn")){
        myTaskManager = myTaskManager.map((task)=>{
            if(task.id === taskId){
             return{...task, isComplete: !task.isComplete};
            }
            return task;
           
        });
    }
    saveTaskList();
    renderTaskList(myTaskManager);
}

//filter and display tasks by TaskName without changing the saved Tasks
function handleSearch(e){
    const searchTerm=e.target.value.toLowercase();
    const filteredTasks=myTaskManager.filter((task)=> task.TaskName.toLowercase().includes(searchTerm),
 );
    renderTaskList(filteredTasks);

}

//event handlers
taskform.addEventListener('submit', handleAddTask);
tasklistcontainer.addEventListener("click", handleTaskClick);
searchBar.addEventListener("input",handleSearch);

//initilaize page
document.addEventListener("DOMContentLoaded",loadtasks);

