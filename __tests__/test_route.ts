import request from "supertest";
import app from "../src/app";

describe("TEST FOR POST METHODS API", () => {
  test("Should return 201 for created Company", async () => {
    const data = {
      organization: "ChiChi Tech",
      products: ["First Programmer", "Bronch"],
      marketValue: "40%",
      address: "Second Lekki",
      ceo: "bn",
      country: "Nigeria",
      noOfEmployees: 2,
      employees: ["james bond", "jackie chan"],
    };
    await request(app)
      .post("/company")
      .send(data)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201);
  });

  test("Should return 400 for invalid data upload", async () => {
    const data = "fake data";
    await request(app)
      .post("/company")
      .send(data)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400);
  });
});

describe("TEST THE GET METHODS FOR API", () => {
  test("should return 200, and json for all companies", async () => {
    await request(app)
      .get("/company")
      .set("Accept", "application/json")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
  });

  test("Should return 200, and json for single company by id", async () => {
    await request(app)
      .get("/company/1")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
  });

  test("Should return 404 for invalid id", async () => {
    await request(app)
      .get("/company/chi")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(404);
  });
});

describe("TEST FOR PUT METHOD API", () => {
  test("Should return 201 for updating", async () => {
    const data = {
      organization: "Golden-C",
      products: ["First Programmer", "Bronch"],
      marketValue: "40%",
      address: "Second Lekki",
      ceo: "bn",
      country: "Nigeria",
      noOfEmployees: 2,
      employees: ["james bond", "jackie chan"],
    };
    await request(app)
      .put("/company/1")
      .send(data)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201);
  });

  test("Should return 400 invalid id", async () => {
    await request(app)
      .put("/company/99")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400);
  });
});

describe("TEST FOR DELETE METHOD API", () => {
  test("Should return 200 for deleted Company", async () => {
    await request(app)
      .delete("/company/1")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
  });

  test("Should return 404 for invalid 1d", async () => {
    await request(app)
      .delete("/company/1")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(404);
  });
});
