const Router = require('koa-router');
const group = require('./group');
const individual = require('./individual');
const moveseat = new Router();

moveseat.use("/group/:code", group.common).get("/group/:code", group.get).post("/group/:code", group.post).delete("/group/:code", group.delete).put("/group/:code", group.put);
moveseat.use("/individual/:code", individual.common).get("/individual/:code", individual.get).post("/individual/:code", individual.post).delete("/individual/:code", individual.delete);
module.exports = moveseat;