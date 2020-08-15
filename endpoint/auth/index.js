const Koa = require("koa");
const Router = require("koa-router");
const user = require('./user');
const auth = new Router();

auth.post("/login", require("./login.js"));
auth.use("/user/:code", user.common).get("/user/:code", user.get).post("/user/:code", user.post).delete("/user/:code", user.delete).patch("/user/:code", user.patch);

module.exports = auth;