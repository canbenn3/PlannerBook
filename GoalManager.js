class GoalManager {
  constructor(category, tBody) {
    this.category = category;
    this.api = new Api();
    this.goalList = [];
    this.goalNum = 0;
    this.fetchGoals();
    this.tBody = tBody;
  }

  fetchGoals = async () => {
    this.goalList = await this.api.getGoalCategory(this.category);
    if (this.goalList.length === 0) {
      this.goalList = "No results";
    }
    this.goalNum = this.goalList.length;
  };

  buildTable = async () => {
    if (this.goalList === "No results") {
      return;
    }
    if (this.goalList.length === 0) {
      await this.fetchGoals();
    }
    const addBtn = this.tBody.nextElementSibling;
    addBtn.addEventListener("click", () => {
      this.#createNewGoal();
    });
    let flip = 0;
    let goalrow;
    const updateFcn = (id) => (goalObj) => {
      let numcompleted = 0;
      let numTotal = 0;
      for (let task of goalObj.tasks) {
        numTotal++;
        if (task.complete === "true") {
          numcompleted++;
        }
      }
      let percent = (numcompleted / numTotal) * 100;
      goalObj.progress.total = numTotal;
      goalObj.progress.completed = numcompleted;
      goalObj.progress.percent_complete =
        numTotal > 0 ? Math.floor(percent) : 0;
      this.api.updateGoal(id, goalObj);
    };
    console.log(this.goalList);
    for (let goal of this.goalList) {
      console.log(goal);
      goalrow = new GoalRow(goal, updateFcn(goal.goal_id), flip % 2 === 0);
      this.tBody.appendChild(goalrow.buildRow());
      flip++;
    }
  };

  #createNewGoal = () => {
    this.goalNum++;
    const newGoal = {
      goal_id: null,
      end_date: "",
      title: "",
      category: this.category,
      progress: {
        total: 0,
        completed: 0,
        percent_complete: 0,
        overdue: 0,
      },
      tasks: [],
      events: [],
    };

    const updateFcn = (goalObj) => {
      // Note that if the user has not put in anything for the name or date, the task will not be added
      // This check will take place within GoalRow class itself
      goalObj.goal_id = Math.floor(Math.random() * 1000000);
      let numcompleted = 0;
      let numTotal = 0;
      for (let task of goalObj.tasks) {
        numTotal++;
        if (task.complete === "true") {
          numcompleted++;
        }
      }
      let percent = (numcompleted / numTotal) * 100;
      goalObj.progress.total = numTotal;
      goalObj.progress.completed = numcompleted;
      goalObj.progress.percent_complete =
        numTotal > 0 ? Math.floor(percent) : 0;
      this.api.addGoal(goalObj);
    };
    const newRow = new GoalRow(newGoal, updateFcn, this.goalNum % 2 === 1);
    this.tBody.appendChild(newRow.buildRow());
  };
}
