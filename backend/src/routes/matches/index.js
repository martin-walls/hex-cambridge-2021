const matches = require("express").Router({ mergeParams: true });

const neode = require("../../neo");

const userLogger = require("../../userLogger");

matches.get("/", (req, res) => {
  const username = req.query.currentuser;
  console.log(`getting matches for ${username}`);

  neode
    .cypher(
      `match (a:User {username: "${username}"})-[:Swiped {like: true}]->(b:User)-[:Swiped {like: true}]->(a) return b`
    )
    .then((r) => {
      const m = neode.hydrate(r, "b");

      const matchNames = [];

      for (let i = 0; i < m.length; i++) {
        const uname = m.get(i).get("username");
        // if (userLogger.isLoggedIn(uname)) {
          matchNames.push(uname);
        // }
      }

      res.json({
        success: true,
        matches: matchNames
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

module.exports = matches;
