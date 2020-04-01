const Router = require("koa-router");
const moveseat = require('./move-seat');
const classes = require('./classes');
const api = new Router();
api.use("/move-seat/:code", moveseat.common).get("/move-seat/:code", moveseat.get).post("/move-seat/:code", moveseat.post).delete("/move-seat/:code", moveseat.delete);
api.use("/classes/:code", classes.common).get("/classes/:code", classes.get).post("/classes/:code", classes.post).delete("/classes/:code", classes.delete);
module.exports = api;
