class GoalRow {
  constructor(goalObj, updateFcn, isDark) {
    this.api = new Api();
    this.goalObj = goalObj;
    this.updateFcn = updateFcn;
    this.isDark = isDark;
    this.row = document.createElement("div");
    this.row.classList.add("row");
    if (isDark) {
      this.row.classList.add("darker-row");
    }
    this.btnContainer = document.createElement("div");
    this.btnContainer.classList.add("btn-container");
    this.goalSection = document.createElement("div");
    this.goalSection.classList.add("goal-section");
    this.dateSection = document.createElement("div");
    this.dateSection.classList.add("date-section");
    this.progressSection = document.createElement("div");
    this.progressSection.classList.add("progress-section");

    this.editBtn = document.createElement("button");
    this.editBtn.classList.add("material-symbols-outlined", "edit");
    this.editBtn.textContent = "edit";

    this.dropdownBtn = document.createElement("button");
    this.dropdownBtn.classList.add("material-symbols-outlined", "dropdown");
    this.dropdownBtn.textContent = "arrow_drop_down";
    this.dropdownBtn.dataset.open = "false";

    this.saveBtn = document.createElement("button");
    this.saveBtn.classList.add("material-symbols-outlined", "save");
    this.saveBtn.textContent = "check";

    this.cancelBtn = document.createElement("button");
    this.cancelBtn.classList.add("material-symbols-outlined", "cancel");
    this.cancelBtn.textContent = "close";

    this.goalInput = document.createElement("input");
    this.dateInput = document.createElement("input");
    this.editBtn.addEventListener("click", () => this.#doEdit());
    this.saveBtn.addEventListener("click", () => this.#doSave());
    this.cancelBtn.addEventListener("click", () => this.#doCancel());
    this.dropdownBtn.addEventListener("click", () => this.#doDropdown());

    this.row.append(this.btnContainer);
    this.row.append(this.goalSection);
    this.row.append(this.dateSection);
    this.row.append(this.progressSection);

    this.taskList = document.createElement("div");
  }

  buildRow = () => {
    this.goalSection.textContent = this.goalObj.title;
    this.dateSection.textContent = this.goalObj.end_date;
    this.progressSection.textContent = `${this.goalObj.progress.completed} / ${this.goalObj.progress.total}`;

    this.btnContainer.innerHTML = "";
    this.btnContainer.append(this.editBtn, this.dropdownBtn);
    if (this.goalObj.goal_id === null) {
      this.#doEdit();
    }
    return this.row;
  };

  #doEdit = () => {
    // event handler for edit btn
    this.btnContainer.innerHTML = "";
    this.btnContainer.append(this.saveBtn, this.cancelBtn);

    this.goalSection.innerHTML = "";
    this.dateSection.innerHTML = "";
    this.goalSection.append(this.goalInput);
    this.dateSection.append(this.dateInput);
    this.goalInput.value = this.goalObj.title;
    this.dateInput.value = this.goalObj.end_date;
  };

  #doSave = () => {
    // event handler for save btn
    this.goalObj.title = this.goalInput.value;

    this.goalObj.end_date = this.dateInput.value;
    if (!this.#isInvalid()) {
      this.updateFcn(this.goalObj);
      this.buildRow();
    }
  };

  #doCancel = () => {
    if (this.goalObj.goal_id || !this.#isInvalid()) {
      this.buildRow();
    }
  };

  #isInvalid = () => {
    if (!this.goalInput.value || !this.goalInput.value) {
      const tBody = this.row.parentElement;
      tBody.removeChild(this.row);
      this.api.deleteGoal(this.goalObj.goal_id);
      return true;
    }
    return false;
  };

  #doDropdown = () => {
    if (this.dropdownBtn.dataset.open === "true") {
      this.#closeTasks();
    } else {
      this.#openTasks();
    }
  };

  #openTasks = () => {
    this.dropdownBtn.dataset.open = "true";
    this.row.insertAdjacentElement("afterend", this.taskList);

    let taskrow;
    let updateTasks = () => {
      this.updateFcn(this.goalObj);
      this.progressSection.textContent = `${this.goalObj.progress.completed} / ${this.goalObj.progress.total}`;
    };
    for (let task of this.goalObj.tasks) {
      taskrow = new TaskRow(task, updateTasks, this.isDark);
      this.taskList.append(taskrow.buildRow());
    }
  };

  #closeTasks = () => {
    this.dropdownBtn.dataset.open = "false";
    this.taskList.innerHTML = "";
  };
}
