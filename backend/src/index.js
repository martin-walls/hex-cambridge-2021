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
  { username: "TwinklePaws52", imgUrl: "https://cdn2.thecatapi.com/images/yTTGK6YL1.jpg" },
  { username: "Peanut", imgUrl: "https://cdn2.thecatapi.com/images/u1.jpg" },
  { username: "Sparkle", imgUrl: "https://cdn2.thecatapi.com/images/dv3.jpg" }
];

// app.user(helmet())

app.use(bodyParser.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   neode.all("User").then((u) => {
//     console.log(u.get(0).get("username"));

//     let usernames = [];
//     for (let i = 0; i < u.length; i++) {
//       usernames.push(u.get(i).get("username"));
//     }

//     res.send(usernames);
//   });
// });

app.get("/", (req, res) => {
  res.send("Hello world");
});

// get all users
app.get("/user/:username", (req, res) => {
  neode.first("User", "username", req.params.username).then((user) => {
    if (!user) {
      res.send({ success: false });
    } else {
      res.send({
        success: true,
        user: {
          username: user.get("username"),
          imgUrl: user.get("img_url")
        }
      });
    }
  });
});

// create new user
app.put("/user/:username", (req, res) => {
  neode
    .create("User", {
      username: req.params.username,
      imgUrl: req.body.img_url
    })
    .then((u) => {
      res.send({
        success: true,
        user: {
          username: u.get("username"),
          imgUrl: u.get("img_url")
        }
      });
    });
});

// doesn't quite work yet
app.get("/nextuser", (req, res) => {
  neode
    .cypher(
      `match (b:User) where not (b)-[:Swiped]-(:User {username: "${req.query.currentuser}"}) and b.username <> "${req.query.currentuser}" return b`
    )
    .then((r) => {
      let u = r.hydrate();
      console.log(u);
      if (!u) {
        res.send({ success: false });
      } else {
        res.send({
          success: true,
          user: {
            username: u.get("username"),
            imgUrl: u.get("img_url")
          }
        });
      }
    });
});

// todo
// app.put("/swipe")

// startDatabase().then(async () => {

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// })
