const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createElement = function (tagName, properties) {
  return Object.assign(document.createElement(tagName), properties);
};

const createTaskElement = function (taskText) {
  const deleteButton = createElement("button", { className: "delete" });
  deleteButton.appendChild(createElement("img", { src: "./remove.svg" }));

  const taskItem = createElement("li");
  taskItem.append(
    createElement("input", { type: "checkbox" }),
    //innerText, not innerHTML: the task text must never be parsed as HTML.
    createElement("label", { className: "task", innerText: taskText }),
    createElement("input", { type: "text", className: "task" }),
    createElement("button", { className: "edit", innerText: "Edit" }),
    deleteButton,
  );
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskElement(newTaskInput.value);

  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector("input[type=text]");
  const label = taskItem.querySelector("label");
  const editButton = taskItem.querySelector(".edit");
  const isEditing = taskItem.classList.contains("editMode");
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }
  taskItem.classList.toggle("editMode");
};
const deleteTask = function () {
  const taskItem = this.parentNode;
  const parentList = taskItem.parentNode;
  parentList.removeChild(taskItem);
};

const toggleTaskCompletion = function () {
  const taskItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(taskItem);
};
addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector("input[type=checkbox]");
  const editButton = taskItem.querySelector("button.edit");
  const deleteButton = taskItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskCompletion;
};

[...todoList.children, ...completedList.children].forEach((taskItem) =>
  bindTaskEvents(taskItem),
);
