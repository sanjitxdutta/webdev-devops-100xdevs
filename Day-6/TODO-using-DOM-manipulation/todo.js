let todos = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (title === "") return;
  todos.push({ title: title, completed: false, editing: false });
  input.value = "";
  render();
}

function deleteTask(index) {
  todos.splice(index, 1);
  render();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  render();
}

function toggleEdit(index) {
  todos[index].editing = !todos[index].editing;
  render();
}

function updateTitle(index, newTitle) {
  todos[index].title = newTitle;
}

function createTodoComponent(todo, index) {
  const divEl = document.createElement("div");
  divEl.className = "todo" + (todo.completed ? " completed" : "");

  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.value = todo.title;
  inputEl.disabled = !todo.editing;
  inputEl.oninput = (e) => updateTitle(index, e.target.value);

  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = todo.completed ? "Undo" : "Done";
  completeBtn.onclick = () => toggleComplete(index);

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = todo.editing ? "Save" : "Edit";
  editBtn.onclick = () => toggleEdit(index);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTask(index);

  divEl.appendChild(inputEl);
  divEl.appendChild(completeBtn);
  divEl.appendChild(editBtn);
  divEl.appendChild(deleteBtn);

  return divEl;
}

function render() {
  const todosDiv = document.getElementById("todos");
  todosDiv.innerHTML = "";

  todos.forEach((todo, index) => {
    todosDiv.appendChild(createTodoComponent(todo, index));
  });

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;

  document.getElementById("statusText").textContent = `${completed} / ${total}`;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  document.getElementById("statusFill").style.width = `${percent}%`;

  const body = document.body;
  const container = document.getElementById("container");

  if (total > 0 && completed === total) {
    body.classList.add("green-theme");
    container.classList.add("green-theme");
  } else {
    body.classList.remove("green-theme");
    container.classList.remove("green-theme");
  }
}
