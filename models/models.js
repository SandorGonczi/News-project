const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then((res) => {
    return res.rows;
  });
};

exports.selectArticleById = (article_id) => {
  const prom1 = db.query("SELECT * FROM articles WHERE article_id = $1;", [
    article_id,
  ]);
  const prom2 = db.query(
    "SELECT COUNT(article_id) AS comment_count FROM comments WHERE article_id = $1;",
    [article_id]
  );
  return Promise.all([prom1, prom2]).then(
    ([{ rows: rows1 }, { rows: rows2 }]) => {
      if (!rows1[0]) {
        return Promise.reject({
          status: 404,
          msg: "No Article exists with that Id!",
        });
      }
      rows2[0].comment_count = +rows2[0].comment_count;
      return { ...rows1[0], ...rows2[0] };
    }
  );
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
