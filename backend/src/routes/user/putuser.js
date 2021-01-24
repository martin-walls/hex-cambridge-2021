const neode = require("../../neo");


module.exports = (req, res) => {
  //TODO probably should check for already exists

  const username = req.params.username;
  const imgUrl = req.body.imgUrl

  neode.writeCypher(
    `match (i:Image {url:"${imgUrl}"})
    create (u:User {username: "${username}"})-[:HasImage]->(i)
    return u, i`
  ).then(r => {
    const u = neode.hydrateFirst(r, "u");
    const i = neode.hydrateFirst(r, "i");
    if (!u) {
      res.json({success: false});
    } else {
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
  }).catch(err => {
    console.log(err);
    res.json({success: false});
  });
};