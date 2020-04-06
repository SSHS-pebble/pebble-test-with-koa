const Router = require("koa-router");
const moveseat = require('./move-seat');
const classes = require('./classes');
const subjects = require('./subjects');
const api = new Router();

api.use("/classes", classes.common).get("/classes", classes.get).post("/classes", classes.post).delete("/classes/:code", classes.delete);
api.use("/subjects/:code", subjects.common).get("/subjects/:code", subjects.get).post("/subjects/:code", subjects.post).delete("/subjects/:code", subjects.delete).put("/subjects/:code", subjects.put);
api.use("/move-seat", moveseat.routes(), moveseat.allowedMethods());
module.exports = api;
