const {
  selectTopics,
  selectArticleById,
  patchVoteById,
  selectUsers,
  selectArticles,
  selectCommentsByArticleId,
  checkIfArticleExists,
} = require("../models/models");

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
  selectArticles().then((articles) => {
    res.status(200).send({ articles });
  });
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
