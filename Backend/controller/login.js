const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRoute = require("express").Router();
const User = require("../models/user");

loginRoute.post("", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });

  const confirmPwd = user
    ? await bcrypt.compare(password, user.passwordHash)
    : null;

  if (!user) {
    return response.status(404).json({ message: "User not found" }).end();
  } else if (!confirmPwd) {
    return response
      .status(400)
      .json({ message: "Invalid Username/Password" })
      .end();
  }

  const userDetails = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userDetails, process.env.SECRET, {
    expiresIn: 60 * 180,
  });

  const message = {
    username,
    id: user._id,
    token,
  };

  return response.status(200).json(message).end;
});

module.exports = loginRoute;
