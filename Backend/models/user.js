const mongoose = require("mongoose");
// const uniqueValidator = require("")

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
    delete object.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
