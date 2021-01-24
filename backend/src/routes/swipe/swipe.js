const swipe = require("express").Router();

const neode = require("../../neo");

// add a relationship to the graph
swipe.post("/", (req, res) => {
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
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

module.exports = swipe;
