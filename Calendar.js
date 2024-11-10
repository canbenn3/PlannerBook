const input = document.getElementById("input-1");
const submitBtn = document.getElementById("submit");
const list = document.getElementById("todo-list");
const save = document.getElementById("save");

submitBtn.addEventListener("click", (e) => {
  const li = document.createElement("li");
  li.innerHTML = input.value;
  input.value = "";
  list.insertAdjacentElement("beforeend", li);
});
