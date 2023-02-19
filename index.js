const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const noteRouter = require("./controller/note");
const userRouter = require("./controller/user");
const loginRouter = require("./controller/login");
const path = require("path");

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(config.DB)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);

app.get("", (request, response) => {
  return response.status(200).json({message: "Welocome to Notes App Homepage"})
});

app.use(middleware.tokenExtractor);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

// routes to handle static pages from the frontend
app.get("/*", (request, response) => {
  response.status(404).json({ error: "Invalid route" });
});

//only this route requires authentication and permission
app.use(middleware.userExtractor);
app.use("/api/notes", noteRouter);

app.use(middleware.errorHandler);
app.listen(config.PORT, () => {
  console.log("listening to port", config.PORT);
});
