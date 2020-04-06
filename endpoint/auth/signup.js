const bcrypt = require("bcrypt");
const isNumber = require('is-number');

module.exports = async (ctx, next) => {
    if(!ctx.request.body.email || !ctx.request.body.name || 1 > ctx.request.body.grade || 3 < ctx.request.body.grade || !ctx.request.body.password || !ctx.request.body.phone) ctx.throw(400);
    if(!isNumber(ctx.request.body.grade) || !isNumber(ctx.request.body.code) || !isNumber(ctx.request.body.class) || !isNumber(ctx.request.body.number)) ctx.throw(400);
    if(ctx.request.body.code <= 0 || ctx.request.body.grade > 3 || ctx.request.body.grade <= 0 || ctx.request.body.class <= 0 || ctx.request.body.number <= 0) ctx.throw(400);
    const isExist = await ctx.state.collection.users.countDocuments({ code: parseInt(ctx.request.body.code, 10)});
    if(isExist >= 1) ctx.throw(400);
    await ctx.state.collection.users.findOneAndUpdate({ code: parseInt(ctx.request.body.code, 10) }, {
        $setOnInsert: {
            email: ctx.request.body.email,
            name: ctx.request.body.name,
            grade: parseInt(ctx.request.body.grade, 10),
            class: parseInt(ctx.request.body.class, 10),
            number: parseInt(ctx.request.body.number, 10),
            phone: ctx.request.body.phone,
            password: await bcrypt.hash(ctx.request.body.password, 10),
            moveSeatInfo: undefined
        }
    }, { upsert: true });

    await next();
};
