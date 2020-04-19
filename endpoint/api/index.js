const Router = require("koa-router");
const moveseat = require('./move-seat');
const classrooms = require('./classrooms');
const subjects = require('./subjects');
const teachers = require('./teachers');
const api = new Router();

api.use("/classrooms/:code", classrooms.common).get("/classrooms/:code", classrooms.get).post("/classrooms/:code", classrooms.post).delete("/classrooms/:code", classrooms.delete).put("/classrooms/:code", classrooms.put);

api.use("/teachers/:code", teachers.common).get("/teachers/:code", teachers.get).post("/teachers/:code", teachers.post).delete("/teachers/:code", teachers.delete).put("/teachers/:code", teachers.put);

api.use("/subjects/:code", subjects.common).get("/subjects/:code", subjects.get).post("/subjects/:code", subjects.post).delete("/subjects/:code", subjects.delete).put("/subjects/:code", subjects.put);

api.use("/move-seat", moveseat.routes(), moveseat.allowedMethods());

module.exports = api;
