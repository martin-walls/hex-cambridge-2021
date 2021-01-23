const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

require("dotenv").config();



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


// get next user that the current user hasn't swiped on yet
app.get("/nextuser", (req, res) => {
  neode
    .cypher(
      `match (b:User) where not (b)-[:Swiped]-(:User {username: "${req.query.currentuser}"}) and b.username <> "${req.query.currentuser}" return b`
    )
    .then((r) => {
      let u = neode.hydrateFirst(r, "b");
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

// add a relationship to the graph
app.put("/swipe", (req, res) => {
  let currentuser = req.body.currentuser;
  let onuser = req.body.onuser;
  let direction = req.body.direction;
  let like = false;
  if (direction === "right") {
    like = true;
  }

  neode
    .writeCypher(
      `match (a:User {username: "${currentuser}"}),(b:User {username: "${onuser}"}) create (a)-[:Swiped {like: ${like}}]->(b)`
    )
    .then((r) => {
      res.send({ success: true });
    });
});


app.get("/images", (req,res) => {
  let count = req.query.count;
  let apiKey = process.env.CAT_API_KEY;

  request("https://api.thecatapi.com/v1/images/search?limit=10", {json: true, headers: {"x-api-key": apiKey}}, (err, r, body) => {
    if (err) {res.send({success: false});}

    let images = []

    for (var i = 0; i < 10; i++) {
      images.push(body[i].url);
    }
    res.send({
      success: true,
      images: images
    })
  })
})


app.listen(3000, () => {
  console.log("listening on port 3000");
});

// })
