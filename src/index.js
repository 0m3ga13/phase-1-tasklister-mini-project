document.addEventListener("DOMContentLoaded", () => {
  //declarations
  const form = document.querySelector("form");

  const descriptionInput = document.getElementById("new-task-description");

  const taskList = document.getElementById("tasks");

  const sortAscendingButton = document.getElementById("sort-ascending");
  sortAscendingButton.style.fontSize = "14px";

  const sortDescendingButton = document.getElementById("sort-descending");
  sortDescendingButton.style.fontSize = "14px";

  sortDescendingButton.style.marginBottom = "1rem";


  //we create an array in the outer scope
  const tasksArray = [];

  //this function : clear the task list and creates and appends based on the task array
  function renderTasks() {

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    tasksArray.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.textContent = task.description;
      listItem.style.color =
        task.priority === 1 ? "red" : task.priority === 2 ? "yellow" : "green";
      listItem.appendChild(task.priorityValue);
      listItem.appendChild(task.deleteButton);
      taskList.appendChild(listItem);
    });
  }


// function to create delete Button
  function createDeleteButton(description) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.fontSize = "12px";
    deleteButton.style.marginLeft = "1rem";
    deleteButton.style.background = "red";

    deleteButton.addEventListener("click", function () {
      const taskIndex = tasksArray.findIndex(
        (taskObj) => taskObj.description === description
      );
      if (taskIndex !== -1) {
        tasksArray.splice(taskIndex, 1);
        renderTasks();
      }
    });
    return deleteButton
  }


  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value;
    let priority = 1;

    const deleteButton = createDeleteButton(description);
    
    const priorityValue = document.createElement("select");
    priorityValue.style.marginLeft = "5rem";

    const highPriority = document.createElement("option");
    highPriority.value = "1";
    highPriority.textContent = "High Priority";
    priorityValue.appendChild(highPriority);

    const mediumPriority = document.createElement("option");
    mediumPriority.value = "2";
    mediumPriority.textContent = "Medium priority";
    priorityValue.appendChild(mediumPriority);

    const lowPriority = document.createElement("option");
    lowPriority.textContent = "Low priority";
    lowPriority.value = "3";
    priorityValue.appendChild(lowPriority);

    priorityValue.addEventListener("change", () => {
      priority = parseInt(priorityValue.value);
      const taskIndex = tasksArray.findIndex(
        (taskObj) => taskObj.description === description
      );
      if (taskIndex !== -1) {
        tasksArray[taskIndex].priority = priority;
        renderTasks();
      }
    });



    const task = { description, priority, deleteButton, priorityValue };

    tasksArray.push(task);

    renderTasks();

    descriptionInput.value = "";
  });

  //ascending order
  sortAscendingButton.addEventListener("click", () => {
    tasksArray.sort((a, b) => b.priority - a.priority);
    renderTasks();
  });

  //descending order
  sortDescendingButton.addEventListener("click", () => {
    tasksArray.sort((a, b) => a.priority - b.priority);
    renderTasks();
  });
});
