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
    this.save = document.createElement("button");
    this.cancel = document.createElement("button");
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
    console.log("TODO: #doEdit");
  };

  #doSave = () => {
    console.log("TODO: #doSave");
  };

  #doCancel = () => {
    console.log("TODO: #doCancel");
  };

  #doCheck = () => {
    console.log("TODO: #doCheck");
  };
}
