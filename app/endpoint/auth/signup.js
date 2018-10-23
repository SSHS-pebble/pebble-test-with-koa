const bcrypt = require("bcrypt");

module.exports = async (ctx, next) => {
    if(!ctx.request.body.email || !ctx.request.body.name || !ctx.request.body.code || !ctx.request.body.password) {
        ctx.throw(400);
    }

    await ctx.state.collection.users.findOneAndUpdate({ email: ctx.request.body.email }, {
        $setOnInsert: {
            email: ctx.request.body.email,
            name: ctx.request.body.name,
            code: ctx.request.body.code,
            phone: ctx.request.body.phone,
            password: await bcrypt.hash(ctx.request.body.password, 10)
        }
    }, { upsert: true });

    await next();
};
