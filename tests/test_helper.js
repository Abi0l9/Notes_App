const Note = require("../models/note");
const User = require("../models/user");

const initialNotes = [
  {
    title: "First note",
    content: "This is the body of the first note",
    id: "63c0115f090aecab015fc679",
  },
  {
    title: "Second note",
    content: "This is the body of the second note",
    id: "63c012868f92c4c6349192d1",
  },
  {
    title: "Third note",
    content: "This is the body of the third note",
    id: "63c11955a44216cd6e3c5276",
  },
  {
    title: "Fourth note",
    content: "This is the body of the fourth note",
    id: "63c5373a1e269c14f3a60c44",
  },
];

const nonExistingId = async () => {
  const note = new Note({
    title: "Test note",
    content: "this is a test note",
  });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});

  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
