const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((res) => {
    return res.rows;
  });
};

exports.selectArticleById = (article_id) => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id HAVING articles.article_id = $1;",
      [article_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "No Article exists with that Id!",
        });
      }
      rows[0].comment_count = +rows[0].comment_count;
      return rows[0];
    });
};

exports.patchVoteById = (article_id, voteNum) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [voteNum, article_id]
    )
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "No Article exists with that Id!",
        });
      }
      return rows[0];
    });
};

exports.selectUsers = () => {
  return db.query("SELECT * FROM users;").then((res) => {
    return res.rows;
  });
};
