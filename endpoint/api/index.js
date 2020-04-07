const Router = require("koa-router");
const moveseat = require('./move-seat');
const classes = require('./classes');
const subjects = require('./subjects');
const api = new Router();

api.get("/classes", classes.getMany).get("/classes/:code", classes.getOne).post("/classes", classes.post).delete("/classes", classes.deleteMany).delete("/classes/:code", classes.deleteOne);
api.use("/subjects/:code", subjects.common).get("/subjects/:code", subjects.get).post("/subjects/:code", subjects.post).delete("/subjects/:code", subjects.delete).put("/subjects/:code", subjects.put);
api.use("/move-seat", moveseat.routes(), moveseat.allowedMethods());
module.exports = api;
