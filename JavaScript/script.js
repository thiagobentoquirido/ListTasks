const inputelement = document.querySelector('.task-input');
const addtaskbutton =  document.querySelector('.new-task-button');
const tasksContainer = document.querySelector('.tasks-container');

const validateInput = () =>{return inputelement.value.trim().length > 0;}
const handleaddTasks = () => {
    const inputisvalid = validateInput();
   
    if(!inputisvalid){
        return inputelement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");
  
    const taskContent = document.createElement("p");
    taskContent.innerText = inputelement.value;
  
    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");
  
    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );
  
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
  
    tasksContainer.appendChild(taskItemContainer);
  
    inputelement.value = "";
    updateLocalStorage();

};

const handleClick = (taskContent) => {
        const tasks = tasksContainer.children;

        for (const task of tasks){
            const CurrentTaskBeingClicked = task.firstChild.isSameNode(taskContent)
            if(CurrentTaskBeingClicked){
                task.firstChild.classList.toggle("completed");
            }
        }
        updateLocalStorage();
};
const handleDeleteClick = (taskItemContainer,taskContent ) =>{
    const tasks = tasksContainer.children;
    for(const task of tasks){
        const CurrentTaskBeingClicked = task.firstChild.isSameNode(taskContent);
        if(CurrentTaskBeingClicked){
            taskItemContainer.remove();
            updateLocalStorage();
        }
    }
};
const updateLocalStorage = () => {
    const tasks = tasksContainer.children;
    const localStorageTasks = [... tasks].map((task) => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');
        return {
            description: content.innerText,isCompleted
        };
    });
    console.log(localStorageTasks);
    localStorage.setItem('tasks',JSON.stringify(localStorageTasks));



}
const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks') || []) ;
    for(const task of tasksFromLocalStorage){
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");
      
        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;
        if (task.isCompleted){
            taskContent.classList.add("completed");
        }
      
        taskContent.addEventListener("click", () => handleClick(taskContent));
    
        const deleteItem = document.createElement("i");
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");
      
        deleteItem.addEventListener("click", () =>
          handleDeleteClick(taskItemContainer, taskContent)
        );
      
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
      
        tasksContainer.appendChild(taskItemContainer);
    }
    console.log(tasksFromLocalStorage);

}
const handleinputchange = () => {
    const inputisvalid = validateInput();
    if(inputisvalid){
        return inputelement.classList.remove("error"); 
    }else {
            inputelement.classList.add("error");
        }
        updateLocalStorage();
      
};
refreshTasksUsingLocalStorage();
addtaskbutton.addEventListener('click',  () => handleaddTasks());
inputelement.addEventListener('input', () => handleinputchange());
