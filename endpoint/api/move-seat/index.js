const Router = require('koa-router');
const group = require('./group');
const individual = require('./individual');
const moveseat = new Router();

moveseat.use("/group", group.common).get("/group", group.get).post("/group", group.post).delete("/group", group.delete).put("/group", group.put);
moveseat.use("/individual/:code", individual.common).get("/individual/:code", individual.get).post("/individual/:code", individual.post).delete("/individual/:code", individual.delete);
module.exports = moveseat;