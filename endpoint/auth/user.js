const bcrypt = require("bcrypt");
const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.email || !ctx.request.body.name || !ctx.request.body.password || !ctx.request.body.phone) ctx.throw(400);
        if(!isNumber(ctx.request.body.grade) || !isNumber(ctx.request.body.class) || !isNumber(ctx.request.body.number)) ctx.throw(400);
        if(ctx.request.body.grade > 3 || ctx.request.body.grade <= 0 || ctx.request.body.class <= 0 || ctx.request.body.number <= 0) ctx.throw(400);
        const isExist = await ctx.state.collection.users.countDocuments({ code: parseInt(ctx.params.code, 10)});
        if(isExist >= 1) ctx.throw(400);
        await ctx.state.collection.users.findOneAndUpdate({ code: parseInt(ctx.params.code, 10) }, {
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
    },
    get: async(ctx, next) => {
        var user = await ctx.state.collection.users.findOne({ code: parseInt(ctx.params.code, 10) });
        if(!user) ctx.throw(400);
        user.password = null;
        if(user.moveSeatInfo) {
            if(user.moveSeatInfo.type == 0) {
                user.moveSeatInfo = await ctx.state.collection.moveSeatIndividual.findOne({ _id: user.moveSeatInfo.id });
            } else {
                user.moveSeatInfo = await ctx.state.collection.moveSeatGroup.findOne({ _id: user.moveSeatInfo.id });
            }
        }
        ctx.body.data = user;
        await next();
    },
    delete: async(ctx, next) => {
        const isExist = await ctx.state.collection.users.countDocuments({ code: parseInt(ctx.params.code, 10)});
        if(!isExist) ctx.throw(400);
        await ctx.state.collection.users.deleteOne({ code: parseInt(ctx.params.code, 10) });
        await next();
    },
    patch: async(ctx, next) => {
        if(!isNumber(ctx.request.body.grade) || !isNumber(ctx.request.body.class) || !isNumber(ctx.request.body.number)) ctx.throw(400);
        if(ctx.request.body.grade > 3 || ctx.request.body.grade <= 0 || ctx.request.body.class <= 0 || ctx.request.body.number <= 0) ctx.throw(400);
        await ctx.state.collection.users.fineOneAndUpdate({ code: parseInt(ctx.params.code, 10) }, {
            $set: {
                grade: parseInt(ctx.request.body.grade, 10),
                class: parseInt(ctx.request.body.class, 10),
                number: parseInt(ctx.request.body.number, 10)
            }
        });
        await next();
    },
    common: async(ctx, next) => {
        if(!isNumber(ctx.params.code) || ctx.params.code < 0) ctx.throw(400);
        await next();
    }
}
