require("dotenv").config();

let PORT = process.env.PORT;
let DB = process.env.NODE_ENV === "test"
? process.env.TEST_DB
: process.env.DB;

module.exports = { PORT, DB };
