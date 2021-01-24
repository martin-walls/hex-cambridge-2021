const neode =  require("../../neo");

const exitchatroom = require("express").Router();

exitchatroom.get("/", (req,res) => {
  let currentuser = req.body.currentUsername;
  let otheruser = req.body.nextUsername;

  neode.writeCypher(
    `match (a:User {username: "${currentuser}"})
    -[:Swiped {like: true}]->
      (b:User {username: "${otheruser}"})
          -[:Swiped {like: true}]->(a)
          -[r1]-(c:Chatroom)-[r2]-(b)
    delete r1, r2, c`
  ).then(r => {
    res.json({
      success: true
    })
  }).catch(err => {
    console.log(err);
    res.json({success: false});
  });
})

module.exports = exitchatroom;