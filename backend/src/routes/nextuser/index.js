const nextuser = require("express").Router();

const neode = require("../../neo");

const single = require("./single");
const all = require("./all");

// get next user that the current user hasn't swiped on yet
// TODO improve selection algorithm
nextuser.get("/", single);

nextuser.get("/all", all);

module.exports = nextuser