const routes = require("express").Router();
const user = require("./user");
const nextuser = require("./nextuser");
const images = require("./images");
const matches = require("./matches");
const logout = require("./logout");
const swipe = require("./swipe");

routes.get("/", (req,res) => {
  res.status(200).json({message: "Connected"});
});

routes.use("/user", user);
routes.use("/nextuser", nextuser);
routes.use("/images", images);
routes.use("/:username/matches", matches);
routes.use("/:username/logout", logout);
routes.use("/swipe", swipe);

module.exports = routes;