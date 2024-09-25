const api = require("./calendarAPI");
const input = document.getElementById("input-1");
const submitBtn = document.getElementById("submit");
const saveBtn = document.getElementById("save");
const toDoList = document.getElementById("todo-list");

submitBtn.addEventListener("click", () => {
  const newItem = input.value;
  const newSpan = document.createElement("span");
  newSpan.type = "checkbox";
  const newDiv = document.createElement("div");

  newSpan.innerHTML = newItem;

  newDiv.appendChild(newSpan);
  toDoList.appendChild(newDiv);
});

saveBtn.addEventListener("click", () => {});
