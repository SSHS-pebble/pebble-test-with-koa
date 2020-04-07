const Router = require("koa-router");
const moveseat = require('./move-seat');
const classrooms = require('./classrooms');
const subjects = require('./subjects');
const teachers = require('./teachers');
const api = new Router();

api.get("/classrooms", classrooms.getMany).post("/classrooms", classrooms.post);
api.get("/classrooms/:code", classrooms.getOne).delete("/classrooms/:code", classrooms.deleteOne);

api.get("/teachers", teachers.getMany).post("/teachers", teachers.post);
api.get("/teachers/:code", teachers.getOne).delete("/teachers/:code", teachers.deleteOne).put("/teachers/:code", teachers.putOne);

api.use("/subjects/:code", subjects.common).get("/subjects/:code", subjects.get).post("/subjects/:code", subjects.post).delete("/subjects/:code", subjects.delete).put("/subjects/:code", subjects.put);

api.use("/move-seat", moveseat.routes(), moveseat.allowedMethods());

module.exports = api;
