const express = require("express");
const app = express();

const {
  getTopics,
  getArticleById,
  updateVoteById,
  getUsers,
  getArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteComment,
  getApiInfo,
} = require("./controllers/contoller");

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.patch("/api/articles/:article_id", updateVoteById);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api", getApiInfo);

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
  if (err.code === "22P02" || "23502" || "23503") {
    res.status(400).send({ msg: "Invalid request!" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "ENOENT") {
    res.status(500).send({ msg: "Internal server error!" });
  }
});

module.exports = app;
