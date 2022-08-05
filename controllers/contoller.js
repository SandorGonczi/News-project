const {
  selectTopics,
  selectArticleById,
  patchVoteById,
  selectUsers,
  selectArticles,
  selectCommentsByArticleId,
  checkIfArticleExists,
  insertCommentByArticleID,
  checkIfTopicExists,
  removeComment,
} = require("../models/models");
const { apiEndPoints } = require("../endpoints");

exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateVoteById = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;
  patchVoteById(article_id, body.inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getArticles = (req, res, next) => {
  const validQueryKeys = ["sortBy", "order", "topic"];
  for (let key in req.query) {
    if (!validQueryKeys.includes(key)) {
      res.status(400).send({ msg: "Invalid Request!" });
    }
  }
  const { sortBy, order, topic } = req.query;
  Promise.all([checkIfTopicExists(topic), selectArticles(topic, sortBy, order)])
    .then((articles) => {
      res.status(200).send({ articles: articles[1] });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([
    checkIfArticleExists(article_id),
    selectCommentsByArticleId(article_id),
  ])
    .then((comments) => {
      res.status(200).send({ comments: comments[1] });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  insertCommentByArticleID(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getApiInfo = (req, res, next) => {
  res.status(200).send({ apiEndPoints });
};
