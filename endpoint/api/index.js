const Router = require("koa-router");
const moveseat = require('./move-seat');
const classrooms = require('./classrooms');
const subjects = require('./subjects');
const teachers = require('./teachers');
const api = new Router();

api.use("/classrooms/:code", classrooms.common).get("/classrooms/:code", classrooms.get).post("/classrooms/:code", classrooms.post).delete("/classrooms/:code", classrooms.delete).patch("/classrooms/:code", classrooms.patch);

api.use("/teachers/:code", teachers.common).get("/teachers/:code", teachers.get).post("/teachers/:code", teachers.post).delete("/teachers/:code", teachers.delete).patch("/teachers/:code", teachers.patch);

api.use("/subjects/:code", subjects.common).get("/subjects/:code", subjects.get).post("/subjects/:code", subjects.post).delete("/subjects/:code", subjects.delete).patch("/subjects/:code", subjects.patch);

api.use("/move-seat", moveseat.routes(), moveseat.allowedMethods());

module.exports = api;
