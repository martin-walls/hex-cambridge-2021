const neode = require("../../neo");

module.exports = (req, res) => {
  const currentuser = req.query.currentuser
  neode
    .cypher(
      `match (b:User)-[:HasImage]->(i:Image)
      where not (b)-[:Swiped]-(:User {username: "${currentuser}"}) and b.username <> "${currentuser}" 
      return b, i`
    )
    .then((r) => {
      const us = neode.hydrate(r, "b");
      const is = neode.hydrate(r, "i");
      console.log(us);
      if (!us || us.length === 0) {
        console.log(`No matches found for ${currentuser}`);
        res.json({ success: false });
      } else {
        const rand = Math.floor(Math.random() * (us.length));
        const u = us.get(rand);
        const i = is.get(rand);

        res.json({
          success: true,
          user: {
            username: u.get("username"),
            imgUrl: i.get("url"),
            breeds: JSON.parse(i.get("breeds")),
            categories: JSON.parse(i.get("categories"))
          }
        });
      }
    });
};