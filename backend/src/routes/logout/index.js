const logout = require("express").Router({mergeParams: true});

const userLogger = require("../../userLogger");

logout.get("/", (req,res) => {
  const username = req.query.currentuser;
  if (userLogger.getUsersLog[username]) {
    userLogger.getUsersLog[username].loggedIn = false;
    res.json({success: true});
  } else {
    res.json({success: false})
  }
});


module.exports = logout;