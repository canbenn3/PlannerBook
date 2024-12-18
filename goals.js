const addBtns = document.getElementsByClassName("add");
const mask = document.getElementById("mask");
const editBtns = document.getElementsByClassName("edit");
let current;
const api = new Api();

for (let btn of addBtns) {
  btn.addEventListener("click", () => {
    console.log("clicked button");
    const section = btn.parentElement;
    const category = section.parentElement.id;
    const type = category.split("-")[0];
    current = type;
    document.getElementById(`${type}-modal`).dataset.open = true;
    mask.dataset.open = "true";
  });
}

mask.addEventListener("click", () => {
  mask.dataset.open = "false";
  document.getElementById(`${current}-modal`).dataset.open = "false";
});
