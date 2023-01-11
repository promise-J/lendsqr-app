"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("../server"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../db/database"));
const uuid_1 = require("uuid");
// jest.useFakeTimers();
const app = (0, supertest_1.default)((0, server_1.default)());
beforeAll((done) => {
    done();
});
describe("POST /user", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.default)("wallet").del();
        yield (0, database_1.default)("user").del();
    }));
    const data = {
        password: "promise",
        c_password: "promise",
        email: "promise@gmail.com",
    };
    const inCompData = {
        password: "promise",
        c_password: "promise",
    };
    describe("Registration of user", () => {
        it("Cant register a user without incomplete data", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield app.post("/api/user").send(inCompData);
            expect(statusCode).toBe(400);
            expect(body).toBe("Please fill the user's fields");
        }));
        it("register user success", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield app.post("/api/user").send(data);
            expect(statusCode).toBe(200);
            expect(body).toBe("User created Successfully");
        }));
        it("Password dont match/ 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const wrongPassworddata = {
                email: "promise@gmail.com",
                password: "promise",
                c_password: "promis",
            };
            const { body, statusCode } = yield app
                .post("/api/user")
                .send(wrongPassworddata);
            expect(body).toBe("Passwords must match");
            expect(statusCode).toBe(400);
        }));
        it("Register a user failure <user already registered>", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield app.post("/api/user").send(data);
            expect(body).toBe("User already exist");
            expect(statusCode).toBe(400);
        }));
    });
    describe("Login /login", () => {
        const loginData = { email: "promise@gmail.com", password: "promise" };
        const wrongLoginData = { email: "prom@gmail.com", password: "promise" };
        it("Should log in if registered <200/success>", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body } = yield app.post("/api/user/login").send(loginData);
            expect(body).toHaveProperty("token");
        }));
        it("Should not log in if not registered <400/failure>", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield app
                .post("/api/user/login")
                .send(wrongLoginData);
            expect(statusCode).toBe(400);
            expect(body).toBe("You need to register");
        }));
        it("Should not log in if not registered <400/failure>", () => __awaiter(void 0, void 0, void 0, function* () {
            const { body, statusCode } = yield app
                .post("/api/user/login")
                .send({ email: "promise@gmail.com", password: "fake" });
            expect(statusCode).toBe(400);
            expect(body).toBe("Wrong Credentials");
        }));
    });
});
// describe("Delete User /api/user", () => {
//   afterAll(async () => {
//     await db("wallet").del();
//     await db("user").del();
//   });
//   describe("/delete user details", () => {
//     const registrationData = { email: "promise@gmail.com", password: "promise", c_password: "promise" };
//     const loginData = { email: "promise@gmail.com", password: "promise" };
//     it("Delete user <failure>", async () => {
//         const {body, statusCode} = await app.delete('/api/user')
//         expect(body).toBe('Oppps! You are unauthorized')
//         expect(statusCode).toBe(404)
//     });
//     it("Delete user <success>", async () => {
//         await app.post('/api/user').send(registrationData)
//         const {body} = await app.post('/api/user/login').send(loginData)
//         console.log(body, 'the body here')
//         // const {body, statusCode} = await app.delete('/api/user')
//         // expect(body).toBe('Oppps! You are unauthorized')
//         // expect(statusCode).toBe(404)
//     });
//   });
// });
describe("Wallet /api/wallet", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.default)("wallet").del();
        yield (0, database_1.default)("user").del();
    }));
    describe("Wallet balance", () => {
        it("Tests for failed balance check", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield app.get("/api/wallet");
            expect(res.headers["auth-token"]).toBeFalsy();
        }));
        it("Tests for Successful balance check", () => __awaiter(void 0, void 0, void 0, function* () {
            let token;
            yield app.post("/api/user").send({
                email: "promise@gmail.com",
                password: "password",
                c_password: "password",
            });
            const { body: tokenObj } = yield app
                .post("/api/user/login")
                .send({ email: "promise@gmail.com", password: "password" });
            token = tokenObj.token;
            const { body } = yield app.get("/api/wallet").set("auth-token", token);
            expect(body).toBe("Your balance is 2000");
        }));
    });
    describe("Wallet Funding", () => {
        it("Tests for failed balance funding", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield app.put("/api/wallet/fund");
            expect(res.headers["auth-token"]).toBeFalsy();
        }));
        it("Tests for Successful balance check", () => __awaiter(void 0, void 0, void 0, function* () {
            let token;
            yield app.post("/api/user").send({
                email: "promise@gmail.com",
                password: "password",
                c_password: "password",
            });
            const { body: tokenObj } = yield app
                .post("/api/user/login")
                .send({ email: "promise@gmail.com", password: "password" });
            token = tokenObj.token;
            const res = yield app
                .put("/api/wallet/fund")
                .set("auth-token", token)
                .send({ amount: 1000 });
            //   expect(res.headers["auth-token"]).toBeFalsy();
            expect(res.body).toBe("Wallet funded successfully");
        }));
    });
    describe("Wallet Withdraw", () => {
        it("Tests for failed balance funding", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield app.put("/api/wallet/withdraw");
            expect(res.headers["auth-token"]).toBeFalsy();
        }));
        it("Tests for Successful balance check", () => __awaiter(void 0, void 0, void 0, function* () {
            let token;
            yield app.post("/api/user").send({
                email: "promise@gmail.com",
                password: "password",
                c_password: "password",
            });
            const { body: tokenObj } = yield app
                .post("/api/user/login")
                .send({ email: "promise@gmail.com", password: "password" });
            token = tokenObj.token;
            const res = yield app
                .put("/api/wallet/withdraw")
                .set("auth-token", token)
                .send({ amount: 1000 });
            expect(res.body).toBe("Account withdrawal successful");
        }));
    });
    describe("Wallet Transfer", () => {
        it("Tests for failed balance transfer", () => __awaiter(void 0, void 0, void 0, function* () {
            const fakeUserId = (0, uuid_1.v4)();
            const { body } = yield app.put(`/api/wallet/transfer/${fakeUserId}`);
            expect(body).toBe("Oppps! You are unauthorized");
        }));
        it("Tests for Successful balance check", () => __awaiter(void 0, void 0, void 0, function* () {
            let token;
            let otherUser;
            yield app
                .post("/api/user")
                .send({
                email: "promise@gmail.com",
                password: "password",
                c_password: "password",
            });
            yield app
                .post("/api/user")
                .send({
                email: "favour@gmail.com",
                password: "password",
                c_password: "password",
            });
            const { body: tokenObj } = yield app
                .post("/api/user/login")
                .send({ email: "promise@gmail.com", password: "password" });
            token = tokenObj.token;
            const users = yield (0, database_1.default)('user').select("*");
            otherUser = users.filter((u) => u.email != 'promise@gmail.com');
            const { body, statusCode } = yield app.put(`/api/wallet/transfer/${otherUser[0].user_id}`).set("auth-token", token).send({ amount: 10 });
            expect(statusCode).toBe(200);
            expect(body).toBe('Transfer Successful');
        }));
    });
});
