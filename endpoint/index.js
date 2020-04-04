const Router = require("koa-router");
const koaBody = require("koa-body");
const passport = require("koa-passport");

require("./auth/config");
const auth = require("./auth");
const api = require("./api");
const middleware = require("../middleware");

const endpoint = new Router();

endpoint.use(async (ctx, next) => {
    ctx.body = {};
    await next();
}).use(koaBody()).use(middleware.getDB).use(passport.initialize()).use(passport.session());
endpoint.use("/auth", auth.routes(), auth.allowedMethods()).use("/api", api.routes(), api.allowedMethods()).use(ctx => ctx.body.status = "success");
module.exports = endpoint;
