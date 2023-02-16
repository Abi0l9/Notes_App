const bcrypt = require("bcrypt");
const loginRoute = require("express").Router();
const User = require("../models/user");

module.exports = loginRoute;
