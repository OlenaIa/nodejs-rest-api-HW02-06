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
import app from "../app.js";
import request from "supertest";
import { User } from '../models/user.js';

const { TEST_DB_HOST, PORT = 3000} = process.env;

describe('test register route', () => {
    let server = null;

    beforeAll(async () => {
        await mongoose.connect(TEST_DB_HOST);
        server = app.listen(PORT);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    test("test register with correct data", async () => {
        const registerData = {
            "password": "12345",
            "email": "ole@qaz.qa"
        };
        const res = await request(app).post("/api/users/register").send(registerData);
        console.log(res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body.user.subscription).toBe('starter');
        expect(res.body.user.email).toBe(registerData.email);

        const user = await User.findOne({ email: registerData.email });
        expect(user.subscription).toBe('starter')
    });   
});



// /* Connecting to the database before each test. */
// beforeEach(async () => {
//   await mongoose.connect(process.env.DB_HOST);
// });

// /* Closing database connection after each test. */
// afterEach(async () => {
//   await mongoose.connection.close();
// });

// describe("POST /api/users/login", () => {
//   it("should login a user", async () => {
//     const res = await request(app).post("/api/users/login").send({
// "password": "12345",
// "email": "olena@qaz.qa"
// });
//     expect(res.statusCode).toBe(200);
//     expect(res.body.user).toBe({
//         "email": "olena@qaz.qa",
//         "subscription": "starter"
//     });
//   });
// });