const input = document.getElementById("input-1");
const submitBtn = document.getElementById("submit");
const list = document.getElementById("todo-list");
const save = document.getElementById("save");

const initialize = async () => {
  console.log("initializing");
  const allValues = await api.getAll();
  console.log("allValues: " + allValues);
  for (const key in allValues) {
    const li = document.createElement("li");
    li.innerHTML = allValues[key].body;
    list.insertAdjacentElement("beforeend", li);
  }
};
initialize();

submitBtn.addEventListener("click", (e) => {
  const li = document.createElement("li");
  api.put(input.value);
  li.innerHTML = input.value;
  input.value = "";
  list.insertAdjacentElement("beforeend", li);
});

save.addEventListener("click", () => {
  api.save();
});
