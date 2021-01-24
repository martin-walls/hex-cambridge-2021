const neode = require("neode")
  .fromEnv()
  .with({
    User: require("./models/User"),
    Image: require("./models/Image")
  });


module.exports = neode;