const Router = require("koa-router");
const moveseat = require('./move-seat');
const classes = require('./classes');
const subjects = require('./subjects');
const teachers = require('./teachers');
const api = new Router();

api.get("/classes", classes.getMany).post("/classes", classes.post);
api.get("/classes/:code", classes.getOne).delete("/classes/:code", classes.deleteOne);

api.get("/teachers", teachers.getMany).post("/teachers", teachers.post);
api.get("/teachers/:code", teachers.getOne).delete("/teachers/:code", teachers.deleteOne).put("/teachers/:code", teachers.putOne);

api.use("/subjects/:code", subjects.common).get("/subjects/:code", subjects.get).post("/subjects/:code", subjects.post).delete("/subjects/:code", subjects.delete).put("/subjects/:code", subjects.put);

api.use("/move-seat", moveseat.routes(), moveseat.allowedMethods());

module.exports = api;
