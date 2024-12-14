const addBtns = document.getElementsByClassName("add");

for (let btn of addBtns) {
  btn.addEventListener("click", () => {
    const section = btn.parentElement;
    const category = section.parentElement.id;
    console.log(category);
    document.getElementById(category).dataset.open = true;
  });
}
