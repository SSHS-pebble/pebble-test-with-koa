const Koa = require("koa");
const koaBody = require("koa-body");
const passport = require("koa-passport");

require("./route/auth-config.js")(passport);
const router = require("./route/index.js");
const middleware = require("./middleware/index.js");

const api = new Koa();

api.use(async (ctx, next) => {
    ctx.body = {};
    await next();
}).use(koaBody()).use(middleware.getDB).use(middleware.getUser).use(passport.initialize()).use(passport.session()).use(router.routes()).use(router.allowedMethods());

module.exports = api;
