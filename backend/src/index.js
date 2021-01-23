const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

require("dotenv").config();


const usersLog = {}


// const {startDatabase} = require("./database/neo");
// const {getUsers} = require("./database/users");

const neode = require("neode")
  .fromEnv()
  .with({
    User: require("./models/User"),
    Image: require("./models/Image")
  });

const app = express();

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   // genid: function(req) {
//   //   return genuuid()
//   // },
//   saveUninitialized: false,
//   resave: false
// }));

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

// log in user
// TODO send cat info
app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  neode.first("User", "username", username).then((user) => {
    if (!user) {
      res.send({ success: false });
    } else {

      if (usersLog[username]) {
        usersLog[username].loggedIn = true;
      } else {
        usersLog[username] = {loggedIn: true}
      }


      res.send({
        success: true,
        user: {
          username: user.get("username"),
          imgUrl: user.get("img_url")
        }
      });
      // sess = req.session;
      // sess.username = user.get("username");
      // sess.logged_in = true;
    }
  });
});

// create new user
app.put("/user/:username", (req, res) => {
  //TODO probably should check for already exists

  const username = req.params.username;
  const imgUrl = req.body.imgUrl

  neode.writeCypher(
    `match (i:Image {url:"${imgUrl}"})
    create (u:User {username: "${username}"})-[:HasImage]->(i)
    return u`
  ).then(r => {
    let u = neode.hydrateFirst(r, "u");
    if (!u) {
      res.json({success: false});
    } else {
      res.json({
        success: true,
        user: {
          username: u.get("username"),
          imgUrl: u.get("imgUrl")
        }
      });
    }
  }).catch(err => {
    console.log(err);
    res.json({success: false});
  });



  // neode
  //   .create("User", {
  //     username: req.params.username,
  //     imgUrl: req.body.img_url
  //   })
  //   .then((u) => {
      
  //     neode.writeCypher(`match (u:User {username: "${u.get("username")}"}),(i:Image {url: "${u.get("imgUrl")}"}) 
  //         create (u)-[:HasImage]->(i)`)
  //       .then(r => {
  //         res.json({
  //           success: true,
  //           user: {
  //             username: u.get("username"),
  //             imgUrl: u.get("imgUrl")
  //           }
  //         });
  //       }).catch(err => {
  //         console.log(err);
  //         res.json({success: false});
  //       });
  //   }).catch(err => {
  //     console.log(err);
  //     res.json({success: false});
  //   });
});


// get next user that the current user hasn't swiped on yet
//TODO return cat info
// TODO improve selection algorithm
app.get("/nextuser", (req, res) => {
  neode
    .cypher(
      `match (b:User) where not (b)-[:Swiped]-(:User {username: "${req.query.currentuser}"}) and b.username <> "${req.query.currentuser}" return b`
    )
    .then((r) => {
      let u = neode.hydrateFirst(r, "b"); //todo improve this
      console.log(u);
      if (!u) {
        res.send({ success: false });
      } else {
        res.json({
          success: true,
          user: {
            username: u.get("username"),
            imgUrl: u.get("img_url")
          }
        });
      }
    });
});

//todo return list of next users

// add a relationship to the graph
app.post("/swipe", (req, res) => {
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
    }).catch(err => {
      console.log(err);
      res.json({success: false});
    });
});

// TODO save cat info in db
app.get("/images", (req,res) => {
  let count = req.query.count;
  let apiKey = process.env.CAT_API_KEY;

  request(`https://api.thecatapi.com/v1/images/search?limit=${count}`, {json: true, headers: {"x-api-key": apiKey}}, (err, r, body) => {
    if (err) {res.send({success: false});}

    // body = [{
    //   "breeds": [],
    //   "categories": [
    //     {
    //       "id": 1,
    //       "name": "hats"
    //     }
    //   ],
    //   "id": "MTY1ODc5MA",
    //   "url": "https://cdn2.thecatapi.com/images/MTY1ODc5MA.png",
    //   "width": 638,
    //   "height": 431
    // }]

    let images = []

    for (let i = 0; i < count; i++) {
      images.push(body[i].url);

      console.log(body[i]);

      // save image data
      neode.create("Image", {
        url: body[i].url,
        breeds: body[i].breeds ? JSON.stringify(body[i].breeds) : "[]",
        categories: body[i].categories ? JSON.stringify(body[i].categories) : "[]"
      })
    }
    res.send({
      success: true,
      images: images
    })
  })
})


app.get("/logout/:username", (req,res) => {
  const username = req.params.username;
  if (usersLog[username]) {
    usersLog[username].loggedIn = false;
    res.json({success: true});
  } else {
    res.json({success: false})
  }
})


app.listen(3000, () => {
  console.log("listening on port 3000");
});

