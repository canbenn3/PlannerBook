const db = new DB("database.txt");

const api = {
  get: (item) => {
    id = stringHash(item);
    return db.get(id);
  },

  getAll: async () => {
    const res = await db.getAll();
    console.log(res);
    return res;
  },

  put: (itemString) => {
    const id = stringHash(itemString);
    const event = {
      key: id,
      body: itemString,
    };
    db.put(event);
  },

  remove: (itemString) => {
    const id = stringHash(itemString);
    db.remove(id);
  },

  save: () => {
    db.save();
  },
};
