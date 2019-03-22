const Router = require("koa-router");
const api = new Router();

module.exports = api
    .use("/move-seat/:grade", require("./move-seat.js").common)
    .get("/move-seat/:grade", require("./move-seat.js").get)
    .post("/move-seat/:grade", require("./move-seat.js").post)
    .delete("/move-seat/:grade", require("./move-seat.js").delete);
