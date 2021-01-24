const matches = require("express").Router({mergeParams: true});

const neode = require("../../neo");


matches.get("/", (req,res) => {
  const username = req.query.currentuser;
  
  neode.cypher(
    `match (a:User {username: "${username}"})-[:Swiped {like: true}]->(b:User)-[:Swiped {like: true}]->(a) return b`
  ).then(r => {
    const m = neode.hydrate(r, "b");

    const matchNames = [];

    for (let i=0; i<m.length; i++) {
      matchNames.push(m.get(i).get("username"));
    }

    res.json({
      success: true,
      matches: matchNames
    });

  }).catch(err => {
    console.log(err);
    res.json({success: false});
  });
});


module.exports = matches;