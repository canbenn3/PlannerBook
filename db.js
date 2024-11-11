class DB {
  constructor(filename) {
    this.server = "http://localhost:8000/";
    this.filename = filename;
    this.putAPI = "api/update-events";
    this.db = null;
    this.init();
  }

  async init() {
    try {
      this.db = await this.getAll();
      console.log("initialized; this.db: " + JSON.stringify(this.db));
    } catch (error) {
      console.error("Failed to load data:", error);
      this.db = {};
    }
  }

  getAll = async () => {
    try {
      const res = await fetch(this.server + this.filename);
      const res_1 = await res.json();
      return res_1;
    } catch (error) {
      return error;
    }
  };

  get = (key) => {
    if (this.db[key]) {
      return this.db[key];
    }
    return null;
  };

  put = (event) => {
    this.db[event.key] = event;
  };

  remove = (key) => {
    if (this.get(key)) {
      delete this.db[key];
      return true;
    }
    return false;
  };

  save = async () => {
    try {
      const response = await fetch(this.server + this.putAPI, {
        method: "PUT",
        body: JSON.stringify(this.db),
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
      console.log("Error saving data");
    }
  };
}
