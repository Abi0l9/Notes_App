const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("", async (request, response) => {
  const users = await User.find({});

  return response.status(200).json({ users }).end();
});

userRouter.post("", async (request, response) => {
  const body = request.body;
});

module.exports = userRouter;
