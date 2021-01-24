const neode = require("../../neo");
const matches = require("../matches");

// get all users this user hasn't matched with
module.exports = (req,res) => {
  const currentuser = req.query.currentuser;
  neode.cypher(
    `match (b:User)-[:HasImage]->(i:Image)
    where not (b)-[:Swiped]-(:User {username: "${currentuser}"}) and b.username <> "${currentuser}" 
    return b, i`)
    .then(r => {
      const us = neode.hydrate(r, "b");
      const is = neode.hydrate(r, "i");

      if (!us || us.length === 0) {
        console.log(`No matches found for ${currentuser}`);
        res.json({ success: false});
      } else {
        const m = [];

        for (let i=0; i<us.length; i++) {
          m.push(
            {
              username: us.get(i).get("username"),
              imgUrl: is.get(i).get("url"),
              breeds: JSON.parse(is.get(i).get("breeds")),
              categories: JSON.parse(is.get(i).get("categories"))
            }
          );
        }

        res.json({
          success: true,
          matches: m
        });
      }
    })
}