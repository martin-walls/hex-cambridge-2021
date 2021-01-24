const user = require("express").Router();
const getuser = require("./getuser");
const putuser = require("./putuser");

user.get("/", (req,res) => {
  res.json({msg: "Hello world"});
});
user.get("/:username", getuser);
user.put("/:username", putuser);

module.exports = user;