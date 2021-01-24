const routes = require("express").Router();
const user = require("./user");
const nextuser = require("./nextuser");
const images = require("./images");
const matches = require("./matches");
const logout = require("./logout");
const swipe = require("./swipe/swipe");
const chatroom = require("./chatroom");
const exitchatroom = require("./exitchatroom");

routes.get("/", (req,res) => {
  res.status(200).json({message: "Connected"});
});

routes.use("/api/user", user);
routes.use("/api/nextuser", nextuser);
routes.use("/api/images", images);
routes.use("/api/matches", matches);
routes.use("/api/logout", logout);
routes.use("/api/swipe", swipe);
routes.use("/api/getchatroom", chatroom);
routes.use("/api/deletechatroom", exitchatroom);

module.exports = routes;