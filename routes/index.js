const { Router } = require("express");
const route = Router();
const albumRoute = require("./albums");
const authorRoute = require("./authors");
const songRoute = require("./songs");
route.use("/authors", authorRoute);
route.use("/albums", albumRoute);
route.use("/songs", songRoute);

module.exports = route;
