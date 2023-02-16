const noteRouter = require("express").Router();
const User = require("../models/user");
const Note = require("../models/note");

noteRouter.get("", (request, response) => response.send("welcome"));
noteRouter.post("", async (request, response) => {
  const { title, body } = request.body;
  const user = await User.findById(request.user);
  const note = new Note({
    title,
    body,
    date: new Date().toUTCString(),
    user: user._id,
  });

  console.log(note);

  return response.json(user);
});

module.exports = noteRouter;
