const express = require("express");
const bodyParser = require("body-parser");


require("dotenv").config();

const routes = require("./routes")


const app = express();


app.use(bodyParser.json());

app.use("/", routes);

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

