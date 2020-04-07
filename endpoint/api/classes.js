const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name || !ctx.request.body.building || !ctx.request.body.individual || !ctx.request.body.group) ctx.throw(400);
        if(!isNumber(ctx.request.body.limit) || !isNumber(ctx.request.body.floor)) ctx.throw(400);
        if(ctx.request.body.limit < 1 || ctx.request.body.floor < 1) ctx.throw(400);
        
        const individualArray = JSON.parse(ctx.request.body.individual);
        const groupArray = JSON.parse(ctx.request.body.group);
        if(!Array.isArray(individualArray) || !Array.isArray(groupArray)) ctx.throw(400);
        individualArray.forEach(allow => { if(allow < 0 || allow > 1) ctx.throw(400); })
        groupArray.forEach(allow => { if(allow < 0 || allow > 1) ctx.throw(400); })

        const classes = await ctx.state.collection.classes.find().toArray();
        var classCode = undefined;
        if(classes.length == 0) classCode = 1;
        else classCode = classes.map(classInfo => classInfo.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(classCode)) ctx.throw(500);

        await ctx.state.collection.classes.findOneAndUpdate({ code: classCode }, {
            $setOnInsert: {
                name: ctx.request.body.name,
                building: ctx.request.body.building,
                floor: parseInt(ctx.request.body.floor, 10),
                moveseat: {
                    limit: parseInt(ctx.request.body.limit, 10),
                    individual: individualArray,
                    group: groupArray
                }
            }
        }, { upsert: true });
        await next();
    },
    getMany: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.classes.find().toArray();
        await next();
    },
    getOne: async(ctx, next) => {
        if(!isNumber(ctx.request.params.code)) ctx.throw(400);
        ctx.body.data = await ctx.state.collection.classes.findOne({ code: parseInt(ctx.request.params.code, 10) });
        await next();
    },
    deleteOne: async (ctx, next) => {
        if(!isNumber(ctx.request.params.code)) ctx.throw(400);
        await ctx.state.collection.classes.deleteOne({ code: parseInt(ctx.request.params.code, 10) });
        await next();
    }
}