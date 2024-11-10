const db = new DB("database.txt");

const api = () => ({
  get: (id) => {
    db.get(id);
  },

  save: (id, input) => {
    db.save(id, input);
  },
});

export default api;
