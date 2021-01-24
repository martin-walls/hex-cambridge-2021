const neode = require("../../neo");

const userLogger = require("../../userLogger");

// log in user
// TODO send cat info
module.exports = (req, res) => {
  const username = req.params.username;

  neode.cypher(
    `match (u:User {username: "${username}"})-[:HasImage]->(i:Image) return u, i`
  ).then(r => {
    let u = neode.hydrateFirst(r, "u");
    let i = neode.hydrateFirst(r, "i");
    if (!u || !i) {
      res.json({success: false});
    } else {
      // set status as logged in
      if (userLogger.getUsersLog[username]) {
        userLogger.getUsersLog[username].loggedIn = true;
      } else {
        userLogger.getUsersLog[username] = {loggedIn: true}
      }

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