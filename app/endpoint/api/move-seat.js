module.exports = {
    post: async (ctx, next) => {
        if(await ctx.state.collection.moveSeatState.count() >= 30) {
            ctx.throw(403);
        }
        await ctx.state.collection.moveSeatState.insertOne({
            user: ctx.state.user._id
        });

        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.moveSeatState.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.moveSeatState.deleteOne({
            user: ctx.state.user._id
        });

        await next();
    }
};
