/** Declare Variables for elements */
const _task = document.getElementById("txtTask");
const _addTask = document.getElementById("iconAdd");
const _completeAll = document.getElementById("lblCompleteAll");
const _clearAll = document.getElementById("lblClearComplete");
const _listTask = document.getElementById("listTask"); // ul
const _totalTask = document.getElementById("lblTotalTask");
const _message = document.getElementById("lblError");
var totalTask = 0;

/** Event Listeners */
_addTask.addEventListener("click", addTask);

/** On loading HTML page, To-do list task gets loaded from 'localstorae' */
window.onload = loadTasks;

function loadTasks() {
  // Get the tasklist from localStorage and convert it to an array
  let tasklist = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]")); // JSON.parse converts an string into an object.

  //debugger;
  // Loop through the tasks and add them to the list
  tasklist.forEach((todo) => {
    const li = document.createElement("li");
    li.title = "click to (un)complete task";
    li.addEventListener(
      "click",
      function (ev) {
        if (ev.target.tagName === "LI") {
          ev.target.classList.toggle("checked");
        }
      },
      false
    );
    if (todo.completed) li.classList = "checked";
    li.innerHTML = `${todo.task}<i title="click to delete task" class="fa fa-trash fr pad-trash" onclick="removeTask(this)"></i>`;
    // li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>

    _listTask.insertBefore(li, _listTask.children[0]);
    _task.focus();
    updateTotaltask();
  });
}

/** ********** Function definitions ********** */

function addTask() {
  let taskvalue = _task.value;
  if (taskvalue === "") {
    _message.innerText = "*please enter the task";
    _message.classList = "clred";
    _task.focus();
    return false;
  }

  // Check if task is already exist..
  let tasklist = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));

  // Check task already exist
  tasklist.forEach((todo) => {
    if (todo.task === taskvalue) {
      _message.innerText = "*task already exist";
      _message.classList = "clred";
      _task.value = "";
      _task.focus();
      return;
    }
  });

  // IMPORTANT :: Save task to localStorage at user device
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { task: taskvalue, completed: false },
    ])
  );

  // create list item, add innerHTML and append to ul 'listTask'
  const li = document.createElement("li");
  li.title = "click to (un)complete task";
  // adding event listener while binding the li
  li.addEventListener(
    "click",
    function (ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        toggleComplete(ev.target.innerText);
      }
    },
    false
  );
  li.innerHTML = `${taskvalue}<i title="click to delete task" class="fa fa-trash fr pad-trash" onclick="removeTask(this)"></i>`;

  _listTask.insertBefore(li, _listTask.children[0]); // Insert at top in LI list
  _task.value = ""; // clear task textbox
  _message.innerText = "task added succesfully";
  _message.classList = "clblue";
  updateTotaltask();
}

function toggleComplete(taskvalue) {
  let tasklist = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  tasklist.forEach((todo) => {
    if (todo.task === taskvalue) todo.completed = !todo.completed;
  });
  localStorage.setItem("tasks", JSON.stringify(tasklist));
}

function removeTask(event) {
  let tasklist = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  let taskname = event.parentNode.innerText;
  //debugger;
  if (tasklist.length > 0) {
    tasklist.forEach((todo) => {
      if (todo.task === taskname) {
        tasklist.splice(tasklist.indexOf(todo), 1); // IMPORTANT :: delete task from localstorage
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasklist));
    event.parentElement.remove(); // delete LI from UL
    updateTotaltask();
    _message.innerText = "`" + taskname + "` deleted succesfully";
    _message.classList = "clblue";
  }
}

function updateTotaltask() {
  let tasklist = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  _totalTask.innerHTML = tasklist.length + " tasks left";
}

function toggleCompleteAllTask(val) {
  // Get the tasklist from localStorage and convert it to an array
  let tasklist = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  //debugger;
  tasklist.forEach((todo) => {
    todo.completed = val;
  });

  localStorage.setItem("tasks", JSON.stringify(tasklist));
  //debugger;
  const list = _listTask.getElementsByTagName("li");
  for (let i = 0; i < list.length; i++) {
    list[i].classList = val ? "checked" : "";
  }
}
