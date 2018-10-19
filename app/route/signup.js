const bcrypt = require("bcrypt");

module.exports = async (ctx, next) => {
    if(!ctx.request.body.email || !ctx.request.body.name || !ctx.request.body.code || !ctx.request.body.password) {
        ctx.throw(400);
    }
    try {
        await ctx.userCollection.insertOne({
            email: ctx.request.body.email,
            name: ctx.request.body.name,
            code: ctx.request.body.code,
            phone: ctx.request.body.phone,
            password: await bcrypt.hash(ctx.request.body.password, 10)
        });
    } catch(e) {
        if(e.name === "MongoError" && e.code === 11000) {
            ctx.throw(409);
        }
        throw e;
    }
    ctx.body.status = "success";
    await next();
};
