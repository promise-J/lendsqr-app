import server from "../server";
import request from "supertest";
import db from "../db/database";
import { v4 as uuidv4 } from "uuid";

// jest.useFakeTimers();
const app = request(server());

beforeAll((done) => {
  done();
});

describe("POST /user", () => {
  afterAll(async () => {
    await db("wallet").del();
    await db("user").del();
  });

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
    it("Cant register a user without incomplete data", async () => {
      const { body, statusCode } = await app.post("/api/user").send(inCompData);
      expect(statusCode).toBe(400);
      expect(body).toBe("Please fill the user's fields");
    });
    it("register user success", async () => {
      const { body, statusCode } = await app.post("/api/user").send(data);
      expect(statusCode).toBe(200);
      expect(body).toBe("User created Successfully");
    });
    it("Password dont match/ 400", async () => {
      const wrongPassworddata = {
        email: "promise@gmail.com",
        password: "promise",
        c_password: "promis",
      };
      const { body, statusCode } = await app
        .post("/api/user")
        .send(wrongPassworddata);
      expect(body).toBe("Passwords must match");
      expect(statusCode).toBe(400);
    });
    it("Register a user failure <user already registered>", async () => {
      const { body, statusCode } = await app.post("/api/user").send(data);
      expect(body).toBe("User already exist");
      expect(statusCode).toBe(400);
    });
  });

  describe("Login /login", () => {
    const loginData = { email: "promise@gmail.com", password: "promise" };
    const wrongLoginData = { email: "prom@gmail.com", password: "promise" };
    it("Should log in if registered <200/success>", async () => {
      const { body } = await app.post("/api/user/login").send(loginData);
      expect(body).toHaveProperty("token");
    });
    it("Should not log in if not registered <400/failure>", async () => {
      const { body, statusCode } = await app
        .post("/api/user/login")
        .send(wrongLoginData);
      expect(statusCode).toBe(400);
      expect(body).toBe("You need to register");
    });
    it("Should not log in if not registered <400/failure>", async () => {
      const { body, statusCode } = await app
        .post("/api/user/login")
        .send({ email: "promise@gmail.com", password: "fake" });
      expect(statusCode).toBe(400);
      expect(body).toBe("Wrong Credentials");
    });
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
  afterAll(async () => {
    await db("wallet").del();
    await db("user").del();
  });

  describe("Wallet balance", () => {
    it("Tests for failed balance check", async () => {
      const res = await app.get("/api/wallet");
      expect(res.headers["auth-token"]).toBeFalsy();
    });
    it("Tests for Successful balance check", async () => {
      let token;
      await app.post("/api/user").send({
        email: "promise@gmail.com",
        password: "password",
        c_password: "password",
      });
      const { body: tokenObj } = await app
        .post("/api/user/login")
        .send({ email: "promise@gmail.com", password: "password" });
      token = tokenObj.token;
      const { body } = await app.get("/api/wallet").set("auth-token", token);
      expect(body).toBe("Your balance is 2000");
    });
  });
  describe("Wallet Funding", () => {
    it("Tests for failed balance funding", async () => {
      const res = await app.put("/api/wallet/fund");
      expect(res.headers["auth-token"]).toBeFalsy();
    });
    it("Tests for Successful balance check", async () => {
      let token;
      await app.post("/api/user").send({
        email: "promise@gmail.com",
        password: "password",
        c_password: "password",
      });
      const { body: tokenObj } = await app
        .post("/api/user/login")
        .send({ email: "promise@gmail.com", password: "password" });
      token = tokenObj.token;
      const res = await app
        .put("/api/wallet/fund")
        .set("auth-token", token)
        .send({ amount: 1000 });
      //   expect(res.headers["auth-token"]).toBeFalsy();
      expect(res.body).toBe("Wallet funded successfully");
    });
  });
  describe("Wallet Withdraw", () => {
    it("Tests for failed balance funding", async () => {
      const res = await app.put("/api/wallet/withdraw");
      expect(res.headers["auth-token"]).toBeFalsy();
    });
    it("Tests for Successful balance check", async () => {
      let token;
      await app.post("/api/user").send({
        email: "promise@gmail.com",
        password: "password",
        c_password: "password",
      });
      const { body: tokenObj } = await app
        .post("/api/user/login")
        .send({ email: "promise@gmail.com", password: "password" });
      token = tokenObj.token;
      const res = await app
        .put("/api/wallet/withdraw")
        .set("auth-token", token)
        .send({ amount: 1000 });
      expect(res.body).toBe("Account withdrawal successful");
    });
  });
  describe("Wallet Transfer", () => {
    it("Tests for failed balance transfer", async () => {
      const fakeUserId = uuidv4();
      const { body } = await app.put(`/api/wallet/transfer/${fakeUserId}`);
      expect(body).toBe("Oppps! You are unauthorized");
    });
    it("Tests for Successful balance check", async () => {
      let token;
      let otherUser
      await app
        .post("/api/user")
        .send({
          email: "promise@gmail.com",
          password: "password",
          c_password: "password",
        });
      await app
        .post("/api/user")
        .send({
          email: "favour@gmail.com",
          password: "password",
          c_password: "password",
        });
        const { body: tokenObj } = await app
        .post("/api/user/login")
        .send({ email: "promise@gmail.com", password: "password" });
        token = tokenObj.token;
        const users = await db('user').select("*")
        otherUser = users.filter((u: any)=> u.email != 'promise@gmail.com')
      const {body, statusCode} = await app.put(`/api/wallet/transfer/${otherUser[0].user_id}`).set("auth-token", token).send({amount: 10});
      expect(statusCode).toBe(200)
      expect(body).toBe('Transfer Successful')
    });
  });
  
});
