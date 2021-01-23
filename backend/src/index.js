const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// const {startDatabase} = require("./database/neo");
// const {getUsers} = require("./database/users");

const neode = require("neode")
  .fromEnv()
  .with({
    User: require("./models/User")
  });

const app = express();

const users = [
  { username: "TwinklePaws52", img_url: "https://cdn2.thecatapi.com/images/yTTGK6YL1.jpg" },
  { username: "Peanut", img_url: "https://cdn2.thecatapi.com/images/u1.jpg" },
  { username: "Sparkle", img_url: "https://cdn2.thecatapi.com/images/dv3.jpg" }
];

// app.user(helmet())

app.use(bodyParser.json());
// app.use(cors());

app.get("/", (req, res) => {
  neode.all("User").then((u) => {
    console.log(u.get(0).get("username"));

    let usernames = [];
    for (let i = 0; i < u.length; i++) {
      usernames.push(u.get(i).get("username"));
    }

    res.send(usernames);
  });
});

// create new user
app.put("/user/:username", (req, res) => {
  neode.create("User", {
    username: req.params.username,
    img_url: req.body.img_url
  }).then(u => {
    res.send({success: true, username: u.get("username"), img_url: u.get("img_url")});
  });
});

// startDatabase().then(async () => {

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// })
