const Koa = require("koa");
const Router = require("koa-router");

const snack = new Router();

snack.use(async(ctx, next) => {
    console.log("Logging snack!!")
    ctx.body = { message : "This is snack!!" };
    await next();
})

module.exports = snack;
