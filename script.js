let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks(tasks); 
}

function renderTasks(taskArray) {
  const taskList = document.getElementById("tasklist");
  taskList.innerHTML = ""; 

  taskArray.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-btn")) return;

      task.completed = !task.completed;
      renderTasks(tasks); 
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete task";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(tasks.indexOf(task), 1);
      renderTasks(tasks);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function showAllTasks() {
  renderTasks(tasks);
}

function showCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  renderTasks(completedTasks);
}
