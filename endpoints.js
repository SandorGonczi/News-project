exports.apiEndPoints = {
  "GET /api": {
    description:
      "serves up a json representation of all the available endpoints of the api",
  },
  "GET /api/topics": {
    description: "serves an array of all topics",
    queries: [],
    exampleResponse: {
      topics: [{ slug: "football", description: "Footie!" }],
    },
  },
  "GET /api/articles": {
    description: "serves an array of all topics",
    queries: ["author", "topic", "sort_by", "order"],
    exampleResponse: {
      articles: [
        {
          title: "Seafood substitutions are increasing",
          topic: "cooking",
          author: "weegembump",
          body: "Text from the article..",
          created_at: 1527695953341,
        },
      ],
    },
  },
};
