module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name) ctx.throw(400);
        await ctx.state.collection.department.insertOne({ name: ctx.request.body.name });
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.department.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        if(!ctx.request.body.name) ctx.throw(400);
        await ctx.state.collection.department.deleteOne({ name: ctx.request.body.name });
        await next();
    }
}