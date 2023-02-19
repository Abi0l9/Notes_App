const bcrypt = require("bcrypt");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("when there is initially one user at db", () => {
  let token;
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("dev", 10);
    const user = new User({
      username: "root",
      passwordHash,
      email: "kash@root.comm",
      name: "admini",
    });

    await user.save();

    const userDetails = {
      username: "root",
      password: "dev",
    };

    const request = await api
      .post("/api/login")
      .send(userDetails)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const jsonRes = JSON.parse(request.text);
    token = jsonRes.token;
  }, 15000);

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "devy",
      name: "admin",
      password: "opensecret",
      email: "admin@root.com",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("user can post notes", async () => {
    const initialNotes = await helper.notesInDb();

    const note = {
      title: "first note",
      content: "body of note",
    };

    await api
      .post("/api/notes")
      .send(note)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .set("Authorization", `Bearer ${token}`);

    const newDb = await helper.notesInDb();

    expect(newDb).toHaveLength(initialNotes.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
