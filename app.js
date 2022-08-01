const express = require("express");
const app = express();

const { getTopics } = require("./controllers/contoller");
app.use(express.json());

app.get("/api/topics", getTopics);

///////////////////

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "The page does not exists!" });
});

module.exports = app;
