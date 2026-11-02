const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function createTask(text) {
  return {
    id: Date.now(),
    text: text,
    done: false
  };
}

function addTask(text) {
  tasks.push(createTask(text));
  saveAndRender();
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveAndRender();
}

function setFilter(name) {
  filter = name;
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === name);
  });
  renderTasks();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function getVisible() {
  if (filter === "open") return tasks.filter((t) => !t.done);
  if (filter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

function countOpen() {
  return tasks.filter((t) => !t.done).length;
}

function taskItem(t) {
  const item = document.createElement("li");
  item.className = t.done ? "done" : "";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = t.done;
  checkbox.addEventListener("change", () => toggleTask(t.id));

  const label = document.createElement("span");
  label.textContent = t.text;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "delete";
  remove.textContent = "Delete";
  remove.addEventListener("click", () => deleteTask(t.id));

  item.append(checkbox, label, remove);
  return item;
}

function renderTasks() {
  list.innerHTML = "";
  getVisible().forEach((t) => {
    list.appendChild(taskItem(t));
  });
  counter.textContent = countOpen() + " left";
}

function handleSubmit(event) {
  event.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    addTask(text);
  }
  input.value = "";
}

form.addEventListener("submit", handleSubmit);
filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

renderTasks();
