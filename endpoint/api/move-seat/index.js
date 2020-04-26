const Router = require('koa-router');
const group = require('./group');
const individual = require('./individual');
const moveseat = new Router();

moveseat.use("/group", group.common).get("/group", group.get).post("/group", group.post).delete("/group", group.delete).patch("/group", group.patch);
moveseat.use("/individual", individual.common).get("/individual", individual.get).post("/individual", individual.post).delete("/individual", individual.delete);

module.exports = moveseat;