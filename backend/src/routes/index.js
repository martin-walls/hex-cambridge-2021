const routes = require("express").Router();
const user = require("./user");
const nextuser = require("./nextuser");
const images = require("./images");
const matches = require("./matches");
const logout = require("./logout");
const swipe = require("./swipe");
const chatroom = require("./chatroom");
const exitchatroom = require("./exitchatroom");

routes.get("/", (req,res) => {
  res.status(200).json({message: "Connected"});
});

routes.use("/user", user);
routes.use("/nextuser", nextuser);
routes.use("/images", images);
routes.use("/matches", matches);
routes.use("/logout", logout);
routes.use("/swipe", swipe);
routes.use("/getchatroom", chatroom);
routes.use("/deletechatroom", exitchatroom);

module.exports = routes;