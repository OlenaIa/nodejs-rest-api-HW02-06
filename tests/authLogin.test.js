/* 
{
"password": "12345",
"email": "olena@qaz.qa"
}

відповідь повина мати статус-код 200
у відповіді повинен повертатися токен
у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

моя шпаргалка до тесту https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/
*/

import mongoose from 'mongoose';
import request from "supertest";
import app from "../app.js";
import dotenv from "dotenv";

dotenv.config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.DB_HOST);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/login", () => {
  it("should login a user", async () => {
    const res = await request(app).post("/api/users/login").send({
"password": "12345",
"email": "olena@qaz.qa"
});
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBe({
        "email": "olena@qaz.qa",
        "subscription": "starter"
    });
  });
});