class Api {
  constructor() {
    this.server = "http://localhost:8000/";
    this.goalPaths = {
      add: "api/add-goal",
      update: "api/update-goal",
      remove: "api/remove-goal",
      get: "api/get-goal",
      getAllCategory: "api/get-all-category-goals",
      getAll: "api/get-all-goals",
    };
    this.eventPaths = {
      add: "api/add-event",
      update: "api/update-event",
      remove: "api/remove-event",
      get: "api/get-event",
      getAllCategory: "api/get-all-category-events",
      getAll: "api/get-all-events",
    };
  }

  addGoal = async (goalObj) => {
    try {
      const response = await fetch(this.server + this.goalPaths.add, {
        method: "PUT",
        body: JSON.stringify(goalObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      } else {
        console.log("Data saved successfully");
      }
    } catch (error) {
      console.log("error saving data");
    }
  };

  updateGoal = async (updateObj) => {
    try {

      const upload = { ...updateObj };
      const response = await fetch(this.server + this.goalPaths.update, {
        method: "PATCH",
        body: JSON.stringify(upload),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      } else {
        console.log("Data updated successfully");
      }
    } catch (error) {
      return error;
    }
  };

  deleteGoal = async (id) => {
    try {
      const response = await fetch(
        this.server + this.goalPaths.remove + "/" + id
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      } else {
        console.log("Data deleted successfully");
      }
    } catch (Error) {
      console.log("Error deleting record");
    }
  };

  getGoal = async (id) => {
    try {
      const res = await fetch(this.server + this.goalPaths.get + "/" + id);
      const buffer = await res.json();
      const goalObj = {
        goal_id: buffer[0][0],
        end_date: buffer[0][1],
        title: buffer[0][2],
        category: buffer[0][3],
        progress: buffer[0][4],
        tasks: buffer[0][5],
        events: buffer[0][6],
      };
      return goalObj;
    } catch (Error) {
      console.log(Error);
    }
  };

  getGoalCategory = async (category) => {
    try {
      const res = await fetch(
        this.server + this.goalPaths.getAllCategory + "/" + category
      );
      const buffer = await res.json();
      const results = [];
      for (let i = 0; i < buffer.length; i++) {
        results.push({
          goal_id: buffer[i][0],
          end_date: buffer[i][1],
          title: buffer[i][2],
          category: buffer[i][3],
          progress: JSON.parse(buffer[i][4].replace(/(\w+):/g, '"$1":')),
          tasks: JSON.parse(buffer[i][5].replace(/(\w+):/g, '"$1":')),
          events: JSON.parse(buffer[i][6]),
        });
      }
      return results;
    } catch (error) {
      return error;
    }
  };

  getAllGoals = async () => {
    try {
      const res = await fetch(this.server + this.goalPaths.getAll);
      const buffer = await res.json();
      const results = [];
      for (let i = 0; i < buffer.length; i++) {
        results.push({
          goal_id: buffer[i][0],
          end_date: buffer[i][1],
          title: buffer[i][2],
          category: buffer[i][3],
          progress: buffer[i][4],
          tasks: buffer[i][5],
          events: buffer[i][6],
        });
      }
      return results;
    } catch (error) {
      console.log(error);
    }
  };

  addEvent = async (eventObj) => {
    try {
      const response = await fetch(this.server + this.eventPaths.add, {
        method: "PUT",
        body: JSON.stringify(eventObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      } else {
        console.log("Data saved successfully");
      }
    } catch (error) {
      console.log("error saving data");
    }
  };

  updateEvent = async (eventId, updateObj) => {
    try {
      const upload = { event_Id: eventId, ...updateObj };
      const response = await fetch(this.server + this.eventPaths.update, {
        method: "PATCH",
        body: JSON.stringify(upload),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      } else {
        console.log("Data updated successfully");
      }
    } catch (error) {
      return error;
    }
  };

  deleteEvent = async (id) => {
    try {
      const response = await fetch(
        this.server + this.eventPaths.remove + "/" + id
      );
      if (!response.ok) {
        throw new Error("Failed to delete");
      } else {
        console.log("Data deleted successfully");
      }
    } catch (Error) {
      console.log("Error deleting record");
    }
  };

  getEvent = async (id) => {
    try {
      const res = await fetch(this.server + this.eventPaths.get + "/" + id);
      const buffer = await res.json();
      const eventObj = {
        event_id: buffer[0][0],
        category: buffer[0][1],
        title: buffer[0][2],
        date: buffer[0][3],
        time: buffer[0][4],
        linked_goal: buffer[0][5],
      };
      return eventObj;
    } catch (Error) {
      console.log(Error);
    }
  };

  getEventCategory = async (category) => {
    try {
      const res = await fetch(
        this.server + this.eventPaths.getAllCategory + "/" + category
      );
      const buffer = await res.json();
      const results = [];
      for (let i = 0; i < buffer.length; i++) {
        results.push({
          event_id: buffer[i][0],
          category: buffer[i][1],
          title: buffer[i][2],
          date: buffer[i][3],
          time: buffer[i][4],
          linked_goal: buffer[i][5],
        });
      }
      return results;
    } catch (error) {
      return error;
    }
  };

  getAllEvents = async () => {
    try {
      const res = await fetch(this.server + this.eventPaths.getAll);
      const buffer = await res.json();
      const results = [];
      for (let i = 0; i < buffer.length; i++) {
        results.push({
          event_id: buffer[i][0],
          category: buffer[i][1],
          title: buffer[i][2],
          date: buffer[i][3],
          time: buffer[i][4],
          linked_goal: buffer[i][5],
        });
      }
      return results;
    } catch (error) {
      console.log(error);
    }
  };
}
