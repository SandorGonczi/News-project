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

exports.selectArticles = (topic, sortBy = "created_at", order = "desc") => {
  const validSortBy = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  validOrder = ["asc", "desc"];

  if (!validSortBy.includes(sortBy) || !validOrder.includes(order)) {
    return Promise.reject({
      status: 404,
      msg: "Invalid request parameters!",
    });
  }
  let QueryStr =
    "SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id";
  let injectArr = [];
  if (topic) {
    QueryStr += " WHERE topic = $1";
    injectArr.push(topic);
  }
  QueryStr += ` GROUP BY articles.article_id ORDER BY ${sortBy} ${order};`;

  return db.query(QueryStr, injectArr).then(({ rows }) => {
    rows.forEach((elem) => (elem.comment_count = +elem.comment_count));
    return rows;
  });
};

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      "SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1;",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkIfArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles where article_id = $1", [article_id])
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "No Article exists with that Id!",
        });
      }
    });
};

exports.checkIfTopicExists = (topic) => {
  if (!topic) return topic;
  return db
    .query("SELECT * FROM topics where slug = $1", [topic])
    .then(({ rows }) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: "No such topic exist!",
        });
      }
    });
};

exports.insertCommentByArticleID = (article_id, username, body) => {
  return db
    .query(
      "INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;",
      [body, username, article_id]
    )
    .then(({ rows }) => rows[0]);
};
