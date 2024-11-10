class DB {
  constructor(filename) {
    this.server = "http://localhost:8000/";
    this.filename = filename;
    this.db = this.getAll();
  }

  getAll = () => {
    const contents = fetch(this.server + this.filename).then((res) =>
      res.json()
    );
    return contents;
  };

  get = (key) => {
    if (this.db[key]) {
      return this.db[key];
    }
    return null;
  };

  put = (event) => {
    this.db[event.key] = event;
    this.save();
  };

  remove = (key) => {
    if (this.get(key)) {
      delete this.db[key];
      this.save();
      return true;
    }
    return false;
  };

  save = () => {
    fetch(this.server + this.filename, this.db);
  };
}
