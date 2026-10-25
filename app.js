//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task"); //Add a new task.
const addTaskButton = document.getElementsByTagName("button")[0]; //first button
const todoList = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedList = document.getElementById("completed-tasks"); //completed-tasks

const createElement = function (tagName, properties) {
  return Object.assign(document.createElement(tagName), properties);
};

const createTaskElement = function (taskText) {
  const deleteButton = createElement("button", { className: "delete" });
  deleteButton.appendChild(createElement("img", { src: "./remove.svg" }));

  const taskItem = createElement("li");
  taskItem.append(
    createElement("input", { type: "checkbox" }),
    createElement("label", { className: "task", innerText: taskText }),
    createElement("input", { type: "text", className: "task" }),
    createElement("button", { className: "edit", innerText: "Edit" }),
    deleteButton,
  );
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  //Append listItem to incompleteTaskHolder
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditing = taskItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const parentList = taskItem.parentNode;
  //Remove the parent list item from the ul.
  parentList.removeChild(taskItem);
};

const toggleTaskCompletion = function () {
  const taskItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(taskItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem) {
  //select ListItems children
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkbox.onchange = toggleTaskCompletion;
};

[...todoList.children, ...completedList.children].forEach((taskItem) =>
  bindTaskEvents(taskItem),
);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
