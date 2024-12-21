const addBtns = document.getElementsByClassName("add");
const mask = document.getElementById("mask");
let current;
let goalManager;
const api = new Api();

for (let btn of addBtns) {
  btn.addEventListener("click", () => {
    const section = btn.parentElement;
    const category = section.parentElement.id;
    const type = category.split("-")[0];
    current = type;
    goalManager = new GoalManager(current);
    const tBody = document.getElementById(`${current}-list`);
    tBody.innerHTML = "";
    goalManager.buildTable(tBody);
    document.getElementById(`${type}-modal`).dataset.open = true;
    mask.dataset.open = "true";
  });
}

mask.addEventListener("click", () => {
  mask.dataset.open = "false";
  document.getElementById(`${current}-modal`).dataset.open = "false";
});
