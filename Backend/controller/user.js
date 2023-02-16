const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("", async (request, response) => {
  const users = await User.find({}).populate("notes");

  return response.status(200).json({ users }).end();
});

userRouter.post("", async (request, response) => {
  const { name, email, password, username } = request.body;
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    email,
    username,
    passwordHash,
  });

  await user.save();

  return response.status(201).json(user);
});

module.exports = userRouter;
