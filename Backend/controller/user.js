const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("", async (request, response) => {
  const users = await User.find({});

  return response.status(200).json({ users }).end();
});

userRouter.post("", async (request, response) => {
  const body = request.body;
  const password = body.password;
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name: body.name,
    email: body.email,
    passwordHash,
  });

  await user.save();

  return response.status(201).json(user);
});

module.exports = userRouter;
