const { selectTopics } = require("../models/models");

exports.getTopics = (req, res, next) => {
  selectTopics().then((topics) => {
    console.log(topics);
    res.status(200).send({ topics });
  });
};
