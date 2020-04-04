const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name || !ctx.request.body.department || !ctx.request.body.type || !ctx.request.body.building) ctx.throw(400);
        if(!isNumber(ctx.request.body.limit) || !isNumber(ctx.request.body.floor) || !isNumber(ctx.request.body.individual) || !isNumber(ctx.request.body.group)) ctx.throw(401);
        if(ctx.request.body.limit <= 0 || ctx.request.body.floor <= 0 || ctx.request.body.individual >= 8 || ctx.request.body.individual < 0 || ctx.request.body.group >= 8 || ctx.request.body.group < 0) ctx.throw(401);
        
        const classes = await ctx.state.collection.classes.find({}).toArray()
        var classcode;
        if(classes.length == 0) classcode = 1;
        else classcode = classes.map(aclass => aclass.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(classcode)) ctx.throw(500);

        await ctx.state.collection.classes.findOneAndUpdate({ name: ctx.request.body.name }, {
            $setOnInsert: {
                code: classcode,
                department: ctx.request.body.department,
                type: ctx.request.body.type,
                building: ctx.request.body.building,
                floor: parseInt(ctx.request.body.floor, 10),
                moveseat: {
                    limit: parseInt(ctx.request.body.limit, 10),
                    individual: parseInt(ctx.request.body.individual, 10),
                    group: parseInt(ctx.request.body.group, 10)
                }
            }
        }, { upsert: true });
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.classes.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        if(!isNumber(ctx.request.params.code)) ctx.throw(400);
        await ctx.state.collection.classes.deleteOne({ name: ctx.request.params.code });
        await next();
    },
    common: async (ctx, next) => {
        await next();
    }
}