const noteRouter = require("express").Router();
const User = require("../models/user");
const Note = require("../models/note");

noteRouter
  .get("", async (request, response) => {
    const notes = await Note.find({}).populate("user", { name: 1 });

    return response.status(200).json(notes).end();
  })

  .post("", async (request, response) => {
    const { title, body } = request.body;
    const user = await User.findById(request.user);

    const note = new Note({
      title,
      body,
      date: new Date().toUTCString(),
      user: user._id,
    });

    const savedNote = await note.save();

    user.notes = user.notes.concat(note.id);
    await user.save();

    return response.status(201).json(note);
  })

  .patch("/:noteId", async (request, response) => {
    const noteId = request.params.noteId;
    const note = await Note.findByIdAndUpdate(noteId, request.body);

    if (note) {
      return response
        .status(200)
        .json({ message: "Edited Successfully" })
        .end();
    } else {
      return response.status(404).json({ message: "Note not found" }).end();
    }
  })

  .delete("/:noteId", async (request, response) => {
    const noteId = request.params.noteId;
    const note = await Note.findByIdAndRemove(noteId);

    if (note) {
      return response
        .status(200)
        .json({ message: "Deleted Successfully" })
        .end();
    } else {
      return response.status(404).json({ message: "Note not found" }).end();
    }
  });

module.exports = noteRouter;
