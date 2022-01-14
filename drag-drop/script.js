const main = document.querySelector("main");

main.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const { name } = e.target.dataset;
    if (name === "add-btn") {
      const todoInput = main.querySelector('[data-name="todo-input"]');
      if (todoInput.value.trim() !== "") {
        const value = todoInput.value;
        const template = `
        <li class="list-group-item" draggable="true" data-id="${Date.now()}">
          <p>${value}</p>
          <button class="btn btn-outline-danger btn-sm" data-name="remove-btn">X</button>
        </li>
        `;
        const todosList = main.querySelector('[data-name="todos-list"]');
        todosList.insertAdjacentHTML("beforeend", template);
        todoInput.value = "";
      }
    } else if (name === "remove-btn") {
      e.target.parentElement.remove();
    }
  }
});

main.addEventListener("dragenter", (e) => {
  if (e.target.classList.contains("list-group")) {
    e.target.classList.add("drop");
  }
});

main.addEventListener("dragleave", (e) => {
  if (e.target.classList.contains("drop")) {
    e.target.classList.remove("drop");
  }
});

main.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("list-group-item")) {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
  }
});

let elemBelow = "";

main.addEventListener("dragover", (e) => {
  e.preventDefault();

  elemBelow = e.target;
});

main.addEventListener("drop", (e) => {
  const todo = main.querySelector(
    `[data-id="${e.dataTransfer.getData("text/plain")}"]`
  );

  if (elemBelow === todo) {
    return;
  }

  if (elemBelow.tagName === "P" || elemBelow.tagName === "BUTTON") {
    elemBelow = elemBelow.parentElement;
  }

  if (elemBelow.classList.contains("list-group-item")) {
    const center =
      elemBelow.getBoundingClientRect().y +
      elemBelow.getBoundingClientRect().height / 2;

    if (e.clientY > center) {
      if (elemBelow.nextElementSibling !== null) {
        elemBelow = elemBelow.nextElementSibling;
      } else {
        return;
      }
    }

    elemBelow.parentElement.insertBefore(todo, elemBelow);
    todo.className = elemBelow.className;
  }

  if (e.target.classList.contains("list-group")) {
    e.target.append(todo);

    if (e.target.classList.contains("drop")) {
      e.target.classList.remove("drop");
    }

    const { name } = e.target.dataset;

    if (name === "completed-list") {
      if (todo.classList.contains("in-progress")) {
        todo.classList.remove("in-progress");
      }
      todo.classList.add("completed");
    } else if (name === "in-progress-list") {
      if (todo.classList.contains("completed")) {
        todo.classList.remove("completed");
      }
      todo.classList.add("in-progress");
    } else {
      todo.className = "list-group-item";
    }
  }
});
