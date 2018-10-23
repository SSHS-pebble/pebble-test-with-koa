const Router = require("koa-router");
const api = new Router();

module.exports = api.use("/move-seat", require("./move-seat.js").common).get("/move-seat", require("./move-seat.js").get).post("/move-seat", require("./move-seat.js").post).delete("/move-seat", require("./move-seat.js").delete);
