const neode = require("../../neo");

const chatroom = require("express").Router();

const {v4} = require("uuid");

const userLogger = require("../../userLogger");
const { username } = require("../../models/User");

///getchatroom body{currentUsername, nextUsername} response body {online: bool, roomId: string}

chatroom.get("/", (req,res) => {
  let currentuser = req.body.currentUsername;
  let otheruser = req.body.targetUsername;

  console.log(JSON.stringify(req.body));

  neode.writeCypher(
    `match (a:User {username: "${currentuser}"})
    -[:Swiped {like: true}]->
      (b:User {username: "${otheruser}"})
          -[:Swiped {like: true}]->(a)
          --(c:Chatroom)--(b)
    set c.online = true
    return c
      `
  ).then(r => {
    const c = neode.hydrateFirst(r, "c");
    console.log(c);

    if (!c) {
      // chatroom doesn't exist so create one
      // const roomId = v4();
      neode.writeCypher(
        `match (a:User {username: "${currentuser}"})
        -[:Swiped {like: true}]->
          (b:User {username: "${otheruser}"})
              -[:Swiped {like: true}]->(a)
        create (a)-[:InChatroom]->(c:Chatroom)<-[:InChatroom]-(b)
        set c.roomId = "${v4()}"
        return c`
      ).then(r2 => {
        const c2 = neode.hydrateFirst(r2, "c");
        if (!c2) {
          console.log("failed to create chatroom");
          res.json({success: false});
        } else {
          res.json({
            success: true,
            online: c2.get("online"),
            roomgId: c2.get("roomId")
          });
        }
      })
    } else {
      // chatroom exists

      const online = userLogger.getUsersLog.hasOwnProperty(otheruser) && userLogger.getUsersLog[otheruser].loggedIn;


      res.json({
        success: true,
        online: online,
        roomId: c.get("roomId")
      });
    }
  })

  // neode.cypher(
  //   `match (a:User {username: "${currentuser}"})
  //       -[:Swiped {like: true}]->
  //         (b:User {username: "${otheruser}"})
  //             -[:Swiped {like: true}]->(a)
  //     merge (a)-[:InChatroom]->
  //       (c:Chatroom)
  //       <-[:InChatroom]-(b)
  // return c`
  // ).then(r => {
  //   const c = neode.hydrate()
  // })

  // res.json({uuid: v4()});
})


module.exports = chatroom;