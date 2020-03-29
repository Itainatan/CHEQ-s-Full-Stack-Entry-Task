const express = require("express");
const app = express();
var http = require("http").Server(app);
const bodyparser = require("body-parser");

const key = require("./utils/key");
key.connect(err => {
  if (err) throw err;
  console.log('Connected!');
});

const runDB = require("./utils/db");
runDB();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const vast = require("./routes/vast");
app.use("/api/vasts", vast);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => { });

