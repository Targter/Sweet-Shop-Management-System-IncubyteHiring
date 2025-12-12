import request from "supertest";
import { app } from "../src/app";
import mongoose from "mongoose";

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/sweetshop_test");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("POST /api/auth/register should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "password123" });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "User created");
  });
});