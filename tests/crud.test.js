const bcrypt = require("bcrypt");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("when user performs CRUD operations after registration and login", () => {
  let token;
  let savedNote;
  let mainNoteToTest;

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

    const note = {
      title: "first note",
      content: "body of note",
    };

    mainNoteToTest = note;

    await api
      .post("/api/notes")
      .send(note)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .set("Authorization", `Bearer ${token}`);

    const allNotes = await helper.notesInDb();

    savedNote = allNotes.at(-1).id;
  }, 15000);

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

  test("user can get a note", async () => {
    await api
      .get("/api/notes/" + savedNote)
      .expect(200)
      .set("Authorization", `Bearer ${token}`);

    const notesInDb = await helper.notesInDb();

    expect(notesInDb.at(-1).content).toContain(mainNoteToTest.content);
  });

  test("user can edit a note", async () => {
    const noteToEdit = { content: "I have edited this content" };

    const note = await api
      .patch("/api/notes/" + savedNote)
      .send(noteToEdit)
      .expect(200)
      .set("Authorization", `Bearer ${token}`);

    const response = JSON.parse(note.text);

    const notesInDb = await helper.notesInDb();
    expect(response.message).toContain("Edited Successfully");
    expect(notesInDb.at(-1).content).toContain(noteToEdit.content);
  });

  test("user can delete a note", async () => {
    const initialNotesInDb = await helper.notesInDb();

    const note = await api
      .delete(`/api/notes/${savedNote}`)
      .expect(200)
      .set("Authorization", `Bearer ${token}`);

    const response = JSON.parse(note.text);

    const notesInDb = await helper.notesInDb();
    expect(response.message).toContain("Deleted Successfully");
    expect(notesInDb).toHaveLength(initialNotesInDb.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
