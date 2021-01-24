const neode = require("../../neo");

module.exports = (req, res) => {
  const currentuser = req.query.currentuser
  neode
    .cypher(
      `match (a:User {username: "${currentuser}"})-[:Swiped {like: true}]-
        (b:User)-[:HasImage]->(i:Image)
      where not (b)<-[:Swiped]-(a) and b.username <> "${currentuser}" 
      return b, i`
    )
    .then((r) => {
      const us = neode.hydrate(r, "b");
      const is = neode.hydrate(r, "i");
      // console.log(us);
      if (!us || us.length === 0) {

        neode.cypher(
          `match (b:User)-[:HasImage]->(i:Image)
          where not (b)-[:Swiped]-(:User {username: "${currentuser}"}) and b.username <> "${currentuser}" 
          return b, i`
        ).then(r2 => {
          const us2 = neode.hydrate(r2, "b");
          const is2 = neode.hydrate(r2, "i");

          if (!us2 || us2.length === 0) {
            console.log(`No matches found for ${currentuser}`);
            res.json({ success: false });
          } else {
            const rand = Math.floor(Math.random() * (us2.length));
            const u = us2.get(rand);
            const i = is2.get(rand);
    
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