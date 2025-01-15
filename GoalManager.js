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
    let goalrow;
    let updateFcn = (id) => (goalObj) => {
      this.api.updateGoal(id, goalObj);
    };
    for (let goal of this.goalList) {
      goalrow = new GoalRow(goal, updateFcn(goal.goal_id), flip % 2 === 0);
      tBody.appendChild(goalrow.buildRow());
      flip++;
    }
  };
}
