const express = require("express");
const cors = require("cors");
const api = require("./calendarAPI");

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.get("/api/retrieve/:id", (req, res) => {
  const id = req.params.id;
  const data = api.retrieve(id);

  if (data) {
    res.status(200).json({ data });
  } else {
    res.status(404).json({ error: "ID not found" });
  }
});

app.post("/api/save", (req, res) => {
  const { id, input } = req.body;
  api.save(id, input);
  res.status(200).json({ message: "Data saved successfully" });
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
