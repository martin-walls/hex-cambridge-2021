const neode = require("neode")
  .fromEnv()
  .with({
    User: require("./models/User"),
    Image: require("./models/Image"),
    Chatroom: require("./models/Chatroom")
  });


module.exports = neode;