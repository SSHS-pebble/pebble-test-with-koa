module.exports = {
    post: async (ctx, next) => {
        if(await ctx.db.collection("move-seat-state").count() >= 30) {
            ctx.throw(403);
        }
        await ctx.db.collection("move-seat-state").insertOne({
            user: ctx.state.user._id
        });

        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.db.collection("move-seat-state").find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.db.collection("move-seat-state").deleteOne({
            user: ctx.state.user._id
        });

        await next();
    }
};
