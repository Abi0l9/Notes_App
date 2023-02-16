const config = require("./utils/config");
const express = require("express");
const app = express();
const userRouter = require("./controller/user");
const loginRouter = require("./controller/login");
const noteRouter = require("./controller/note");
const middleware = require("./utils/middleware");

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(config.DB)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error(err));

app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/notes", noteRouter);
app.get("", (request, response) => response.json({ message: "works well" }));

app.listen(config.PORT, () => {
  console.log("listening to port", config.PORT);
});
