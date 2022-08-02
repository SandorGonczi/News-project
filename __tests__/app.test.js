const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

describe("/api/topics", () => {
  test("GET:200 sends an array of objects with the correct properties to the client", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body.topics).toEqual(expect.any(Array));
        expect(Object.keys(response.body.topics[0])).toEqual(
          expect.arrayContaining(["slug", "description"])
        );
      });
  });
  test("ALL:404 should return a 404 when t path not exist", () => {
    return request(app)
      .get("/api/invalidpath")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("The page does not exists!");
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET:200 sends an article object with the correct properties to the client", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        expect(response.body.article).toMatchObject({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
        });
      });
  });
  test("GET:404 sends an error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("No Article exists with that Id!");
      });
  });
  test("GET:400 sends an error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not_a_number")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid request!");
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("PATCH:200 updates a votecount of an article by the value received in the request", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: -2,
      })
      .expect(200)
      .then((response) => {
        expect(response.body.article).toMatchObject({
          author: "butter_bridge",
          title: "Living in the shadow of a great man",
          article_id: 1,
          body: "I find this existence challenging",
          topic: "mitch",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 98,
        });
      });
  });
  test("PATCH:404 sends an error message when given a valid but non-existent id", () => {
    return request(app)
      .patch("/api/articles/666")
      .send({
        inc_votes: -2,
      })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("No Article exists with that Id!");
      });
  });
  test("PATCH:400 sends an error message when given an invalid id", () => {
    return request(app)
      .patch("/api/articles/not_a_number")
      .send({
        inc_votes: -2,
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid request!");
      });
  });
  test("PATCH:400 sends an error message when given an invalid type as vote count", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: "a",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid request!");
      });
  });

  test("PATCH:400 sends an error message when given a wrong key in the body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        wrong_key: -2,
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid request!");
      });
  });
});

afterAll(() => db.end());
