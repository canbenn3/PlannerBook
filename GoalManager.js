class GoalManager {
  constructor(category) {
    this.category = category;
    this.api = new Api();
    this.goalList = [];
    this.goalNum = 0;
    this.fetchGoals();
  }

  fetchGoals = async () => {
    this.goalList = await this.api.getGoalCategory(this.category);
    if (this.goalList.length === 0) {
      this.goalList = "No results";
    }
    this.goalNum = this.goalList.length;
  };

  buildTable = async (tBody) => {
    const addBtn = tBody.nextElementSibling;
    addBtn.addEventListener("click", () => {
      newGoalRow();
    });
    if (this.goalList === "No results") {
      return;
    }
    if (this.goalList.length === 0) {
      await this.fetchGoals();
    }
    let flip = 0;
    for (let goal of this.goalList) {
      console.log("goal: ", goal);
      tBody.appendChild(this.buildRow(goal, flip));
      flip++;
    }
  };

  buildRow = (goal, flip) => {
    const row = document.createElement("div");
    row.id = goal.goal_id;
    row.classList.add("row");
    if (flip % 2 === 0) {
      row.classList.add("darker-row");
    }

    const dropBtn = document.createElement("button");
    dropBtn.className = "material-symbols-outlined dropdown";
    dropBtn.innerHTML = "arrow_drop_down";
    dropBtn.dataset.open = "false";
    this.#addDropDown(dropBtn, goal, row.classList.contains("darker-row"));

    const btnCell = document.createElement("div");
    btnCell.appendChild(dropBtn);

    const titleCell = document.createElement("div");
    titleCell.textContent = goal.title;
    titleCell.classList.add("goal-section");

    const dateCell = document.createElement("div");
    dateCell.textContent = goal.end_date;
    dateCell.classList.add("date-section");

    const progressCell = document.createElement("div");
    progressCell.textContent = `${goal.progress.completed} / ${goal.progress.total}`;
    progressCell.classList.add("progress-section");

    row.appendChild(btnCell);
    row.appendChild(titleCell);
    row.appendChild(dateCell);
    row.appendChild(progressCell);
    return row;
  };

  #addDropDown = (dropBtn, goal, isDarker) => {
    dropBtn.addEventListener("click", () => {
      if (dropBtn.dataset.open === "true") {
        this.#closeDrop(dropBtn);
      } else {
        this.#openDrop(dropBtn, goal, isDarker);
      }
    });
  };

  #openDrop = (dropBtn, goal, isDarker) => {
    dropBtn.dataset.open = "true";
    const table = document.createElement("div");
    table.classList.add("task-table");
    if (isDarker) {
      table.classList.add("darker-row");
    }
    for (let task of goal.tasks) {
      table.appendChild(this.#buildTaskRow(task));
    }
    const col = dropBtn.parentElement;
    const row = col.parentElement;
    row.insertAdjacentElement("afterend", table);
  };

  #buildTaskRow = (task) => {
    const row = document.createElement("div");
    row.classList.add("row");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.classList.add("material-symbols-outlined");
    editBtn.innerHTML = "edit";

    const title = document.createElement("div");
    title.classList.add("goal-section");
    title.innerHTML = task.task_name;

    const date = document.createElement("div");
    date.classList.add("date-section");
    date.innerHTML = task.end_date;

    const isComplete = document.createElement("div");
    isComplete.classList.add("progress-section");
    const check = document.createElement("input");
    check.type = "checkbox";
    isComplete.appendChild(check);
    if (task.complete === "true") {
      check.checked = true;
    }

    row.appendChild(editBtn);
    row.appendChild(title);
    row.appendChild(date);
    row.appendChild(isComplete);
    return row;
  };

  #closeDrop = (dropBtn) => {
    dropBtn.dataset.open = "false";
    const col = dropBtn.parentElement;
    const row = col.parentElement;
    const dropBox = row.nextElementSibling;
    row.parentElement.removeChild(dropBox);
  };

  newGoalRow = () => {};

  editGoalRow = (row) => {
    // const btnContainer = row.firstChild;
    // const title = btnContainer.nextElementSibling;
    // const date = title.nextElementSibling;
    // const progress = date.nextElementSibling;
    // const originalGoal = {
    //   goal_id: row.id,
    //   end_date: date.innerText,
    //   title: title.innerText,
    //   category: this.category,
    //   progress:
    //   tasks:
    //   events:
    // }
  };

  newTaskRow = () => {};

  editTaskRow = (row) => {
    const goalId = row.parentElement.previousElementSibling.id;
    const btnContainer = row.firstChild;
    const taskTitle = btnContainer.nextElementSibling;
    const date = taskTitle.nextElementSibling;
    const complete = date.nextElementSibling;

    btnContainer.innerHTML = "";
    const save = document.createElement("button");
    const cancel = document.createElement("button");
    

    const nameInput = document.createElement("input");
    nameInput.value = `${taskTitle.innerText}`;
    taskTitle.innerHTML = "";
    taskTitle.appendChild(nameInput);

    const dateInput = document.createElement("input");
    dateInput.value = `${date.innerText}`;
    date.innerHTML = "";
    date.appendChild(dateInput);



  };

  #idHash = (title) => {};

  saveGoal = async (newGoal) => {
    this.api.addGoal(newGoal);
  };
}
