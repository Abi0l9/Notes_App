const app = require("./app");
const http = require("http");
const config = require("./utils/config");

http.createServer(app);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log("listening to port", PORT);
});
