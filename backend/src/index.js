const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

require("dotenv").config();

const routes = require("./routes")


const app = express();


app.use(bodyParser.json());

app.use("/", routes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

