module.exports = {
    post: async (ctx, next) => {
        console.log(ctx.request.body);
        await ctx.state.collection.classes.findOneAndUpdate({ code: parseInt(ctx.params.code) }, {
            $setOnInsert: {
                name: ctx.request.body.name,
                limit: parseInt(ctx.request.body.limit),
                department: ctx.request.body.department,
                type: ctx.request.body.type,
                building: ctx.request.body.building,
                floor: parseInt(ctx.request.body.floor)
            }
        }, { upsert: true });
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.classes.findOne({ code: parseInt(ctx.params.code) });
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.classes.deleteOne({ code: parseInt(ctx.params.code) });
        await next();
    },
    common: async (ctx, next) => {
        if(!ctx.params.code || ctx.params.code <= 0) ctx.throw(400);
        await next();
    }
}