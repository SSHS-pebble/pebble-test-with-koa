const Router = require("koa-router");
const auth = new Router();

module.exports = auth
    .post("/login", require("./login.js"))
    .post("/signup", require("./signup.js"));
