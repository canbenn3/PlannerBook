// This file is in charge of writing and retrieving data from a text file.
const fs = require("fs");

class DB {
  constructor(fileName) {
    this.fileName = fileName;
    this.data = {};
    try {
      const content = JSON.parse(fs.readFileSync(fileName, "utf-8"));
      this.data = content;
      console.log(this.data.event1);
    } catch (error) {
      console.log("error" + error);
    }
  }

  retrieveById = (id) => {
    if (this.data[id]) {
      return this.data[id];
    } else {
      console.error(`${this.data.id} doesn't exist`);
    }
  };

  save = (id, input) => {
    this.data[id] = input;
    this.writeToDB();
  };

  writeToDB = () => {
    fs.write(this.fileName, JSON.stringify(this.data), () => ({
      code: 200,
    }));
  };
}

module.exports = DB;
