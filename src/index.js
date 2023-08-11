document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const descriptionInput = document.getElementById("new-task-description"); 
  const taskList = document.getElementById("tasks"); 

  form.addEventListener("submit", function(event) {
    event.preventDefault();   
    const description = descriptionInput.value;
    const listItem = document.createElement("li");
    listItem.textContent = description;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.style.fontSize = "12px"
    deleteButton.style.marginLeft = "5rem"
    deleteButton.style.background = "red"
    deleteButton.addEventListener("click", function() {
      taskList.removeChild(listItem);
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem)
    descriptionInput.value = "";
  });


});
