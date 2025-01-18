class TaskRow {
  constructor(taskObj, updateFcn, isDark) {
    this.taskObj = taskObj;
    this.updateFcn = updateFcn;

    this.row = document.createElement("div");
    this.row.classList.add("row");
    if (isDark) {
      this.row.classList.add("darker-row");
    }

    this.btnContainer = document.createElement("div");
    this.btnContainer.classList.add("btn-container");

    this.taskSection = document.createElement("div");
    this.taskSection.classList.add("goal-section");
    this.dateSection = document.createElement("div");
    this.dateSection.classList.add("date-section");
    this.checkbox = document.createElement("input");
    this.checkbox.classList.add("progress-section");
    this.checkbox.type = "checkbox";

    this.row.append(
      this.btnContainer,
      this.taskSection,
      this.dateSection,
      this.checkbox
    );

    this.taskInput = document.createElement("input");
    this.dateInput = document.createElement("input");

    this.edit = document.createElement("button");
    this.edit.classList.add("material-symbols-outlined", "edit");
    this.edit.textContent = "edit";

    this.save = document.createElement("button");
    this.save.classList.add("material-symbols-outlined", "save");
    this.save.textContent = "check";

    this.cancel = document.createElement("button");
    this.cancel.classList.add("material-symbols-outlined", "cancel");
    this.cancel.textContent = "close";

    this.edit.addEventListener("click", () => this.#doEdit());
    this.save.addEventListener("click", () => this.#doSave());
    this.cancel.addEventListener("click", () => this.#doCancel());
  }

  buildRow = () => {
    this.btnContainer.innerHTML = "";
    this.btnContainer.appendChild(this.edit);
    this.taskSection.textContent = this.taskObj.task_name;
    this.dateSection.textContent = this.taskObj.end_date;
    this.checkbox.checked = this.taskObj.complete === "true";
    this.checkbox.addEventListener("change", () => this.#doCheck());
    return this.row;
  };

  #doEdit = () => {
    this.btnContainer.innerHTML = "";
    this.btnContainer.append(this.save, this.cancel);
    this.#redoCheckbox();

    this.taskSection.innerHTML = "";
    this.dateSection.innerHTML = "";
    this.taskInput.value = this.taskObj.task_name;
    this.dateInput.value = this.taskObj.end_date;
    this.taskSection.append(this.taskInput);
    this.dateSection.append(this.dateInput);
  };

  #doSave = () => {
    this.taskObj.task_name = this.taskInput.value;
    this.taskObj.end_date = this.dateInput.value;
    this.taskObj.complete = this.checkbox.checked ? "true" : "false";
    console.log("checkbox:", this.checkbox);
    this.updateFcn();
    this.buildRow();
  };

  #doCancel = () => {
    this.buildRow();
  };

  #doCheck = () => {
    this.taskObj.complete = this.checkbox.checked ? "true" : "false";
    this.updateFcn();
    this.buildRow();
  };

  #redoCheckbox = () => {
    this.checkbox.replaceWith(this.checkbox.cloneNode(true));
  };
}
