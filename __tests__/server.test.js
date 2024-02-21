const request = require("supertest");
const app = require("../server");

// Test suite for the GET /api/moderation/predict endpoint
describe("GET /api/moderation/predict", () => {
  // Test case: It should respond with JSON when given valid input
  it("responds with json", async () => {
    // Make a GET request to the endpoint with valid input
    const response = await request(app)
      .get("/api/moderation/predict")
      .query({ text: "test text", language: "en-US" })
      .set("Accept", "application/json");

    // Assert that the response status code is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Assert that the response body has a property named "prediction"
    expect(response.body).toHaveProperty("prediction");
  });

  // Test case: It should respond with an error when given an invalid language
  it("responds with error for invalid language", async () => {
    // Make a GET request to the endpoint with an invalid language
    const response = await request(app)
      .get("/api/moderation/predict")
      .query({ text: "test text", language: "invalid" })
      .set("Accept", "application/json");

    // Assert that the response status code is 500 (Internal Server Error)
    expect(response.statusCode).toBe(500);
  });
});

// Test suite for the GET /api/moderation/score endpoint
describe("GET /api/moderation/score", () => {
  // Test case: It should respond with JSON when given valid input
  it("responds with json", async () => {
    // Make a GET request to the endpoint with valid input
    const response = await request(app)
      .get("/api/moderation/score")
      .query({ text: "test text", language: "en-US" })
      .set("Accept", "application/json");

    // Assert that the response status code is 200 (OK)
    expect(response.statusCode).toBe(200);
    // Assert that the response body has a property named "score"
    expect(response.body).toHaveProperty("score");
  });

  // Test case: It should respond with an error when given an invalid language
  it("responds with error for invalid language", async () => {
    // Make a GET request to the endpoint with an invalid language
    const response = await request(app)
      .get("/api/moderation/score")
      .query({ text: "test text", language: "invalid" })
      .set("Accept", "application/json");

    // Assert that the response status code is 500 (Internal Server Error)
    expect(response.statusCode).toBe(500);
  });
});
