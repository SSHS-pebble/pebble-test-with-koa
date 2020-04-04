const Router = require("koa-router");
const moveseat = require('./move-seat');
const classes = require('./classes');
const api = new Router();

api.use("/classes", classes.common).get("/classes", classes.get).post("/classes", classes.post).delete("/classes/:code", classes.delete);
api.use("/move-seat", moveseat.routes(), moveseat.allowedMethods());
module.exports = api;
