const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((res) => {
    return res.rows;
  });
};

exports.selectArticleById = (article_id) => {
  return db
    .query(
      "SELECT author, title, article_id, body, topic, created_at, votes FROM articles WHERE article_id = $1;",
      [article_id]
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
