const noteRouter = require("express").Router();
const userExtractor = require("../utils/middleware").userExtractor;
const User = require("../models/user");
const Note = require("../models/note");

noteRouter.get("", userExtractor, (request, response) => {
  const user = request.user;
});

module.exports = noteRouter;
