const get = document.getElementById("get-goal");
const getAll = document.getElementById("get-all-goals");
const getCategory = document.getElementById("get-all-physical");
const put = document.getElementById("put-goal");
const update = document.getElementById("update-goal");
const remove = document.getElementById("delete-goal");

const getE = document.getElementById("get-event");
const getAllE = document.getElementById("get-all-events");
const getCategoryE = document.getElementById("get-all-physical-events");
const putE = document.getElementById("put-event");
const updateE = document.getElementById("update-event");
const removeE = document.getElementById("delete-event");

const api = new Api();

getAll.addEventListener("click", async () => {
  const response = await api.getAllGoals();
  console.log(response);
});

get.addEventListener("click", async () => {
  id = 1001020;
  const response = await api.getGoal(id);
  console.log(response);
});

put.addEventListener("click", () => {
  goalObj = {
    goal_id: 1001020,
    end_date: "2024-12-25",
    title: "Run a marathon",
    category: "physical",
    progress: {},
    tasks: [],
    events: [],
  };
  api.addGoal(goalObj);
});

getCategory.addEventListener("click", async () => {
  const response = await api.getGoalCategory("physical");
  console.log("response for Physical: ", response);
});

update.addEventListener("click", () => {
  const goalId = 1001020;
  const updateObj = {
    progress: { total: 2, completed: 0, percent_complete: 0, overdue: 0 },
    tasks: [
      { task_name: "add", end_date: "2024-12-25", complete: false },
      { task_name: "get", end_date: "2024-12-25", complete: false },
    ],
  };
  api.updateGoal(goalId, updateObj);
});

remove.addEventListener("click", () => {
  const goalId = 1001020;
  api.deleteGoal(goalId);
});

getAllE.addEventListener("click", async () => {
  const response = await api.getAllEvents();
  console.log(response);
});

getE.addEventListener("click", async () => {
  id = 101;
  const response = await api.getEvent(id);
  console.log(response);
});

putE.addEventListener("click", () => {
  eventObj = {
    event_id: 101,
    category: "physical",
    title: "Run 30 minutes",
    date: "2024-12-20",
    time: "1430",
    linked_goal: 1001020,
  };
  api.addEvent(eventObj);
});

getCategoryE.addEventListener("click", async () => {
  const response = await api.getEventCategory("physical");
  console.log("response for physical: ", response);
});

updateE.addEventListener("click", () => {
  const eventId = 101;
  const updateObj = {
    date: "2024-12-19",
    time: "0830",
  };
  api.updateEvent(eventId, updateObj);
});

removeE.addEventListener("click", () => {
  const eventId = 101;
  api.deleteEvent(eventId);
});
