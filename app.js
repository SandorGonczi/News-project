const express = require("express");
const app = express();
const {
  getTopics,
  getArticleById,
  updateVoteById,
  getUsers,
} = require("./controllers/contoller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", updateVoteById);

app.get("/api/users", getUsers);

///////////////////

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "The page does not exists!" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || "23502") {
    res.status(400).send({ msg: "Invalid request!" });
  }
});

module.exports = app;
