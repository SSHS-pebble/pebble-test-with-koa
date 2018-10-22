const Koa = require("koa");
const koaBody = require("koa-body");
const passport = require("koa-passport");

require("./auth/config.js");
const auth = require("./auth/index.js");
const api = require("./api/index.js");
const middleware = require("./middleware/index.js");

const endpoint = new Koa();

endpoint.use(async (ctx, next) => {
    ctx.body = {};
    await next();
}).use(koaBody()).use(middleware.getDB).use(passport.initialize()).use(passport.session()).use(auth.routes()).use(auth.allowedMethods()).use(api.routes()).use(api.allowedMethods()).use(async ctx => ctx.body.status = "success");

module.exports = endpoint;
