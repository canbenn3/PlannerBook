// import DB from "./db";
const DB = require("./db");

const db = new DB("database.txt");

const api = () => ({
  retrieve: () => {},

  save: (id, input) => {
    db.save(id, input);
  },
});

export default api;
