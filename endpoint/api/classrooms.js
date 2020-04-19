const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name || !ctx.request.body.building || !ctx.request.body.individual || !ctx.request.body.group) ctx.throw(400);
        if(!isNumber(ctx.request.body.limit) || !isNumber(ctx.request.body.floor)) ctx.throw(400);
        if(ctx.request.body.limit < 1 || ctx.request.body.floor < 1) ctx.throw(400);
        if(ctx.params.code > 9) ctx.throw(400);

        const individualArray = JSON.parse(ctx.request.body.individual);
        const groupArray = JSON.parse(ctx.request.body.group);
        if(!Array.isArray(individualArray) || !Array.isArray(groupArray)) ctx.throw(400);
        individualArray.forEach(allow => { if(allow != 0 && allow != 1) ctx.throw(400); })
        groupArray.forEach(allow => { if(allow != 0 && allow != 1) ctx.throw(400); })
        
        const departmentCode = parseInt(ctx.params.code, 10);
        const classrooms = await ctx.state.collection.classrooms.find({ code: { $gte: departmentCode*100, $lt: (departmentCode+1)*100 } }).toArray();
        var classroomCode = undefined;
        if(classrooms.length == 0) classroomCode = 1;
        else classroomCode = classrooms.map(classInfo => classInfo.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(classroomCode)) ctx.throw(500);
        classroomCode += departmentCode*100;

        await ctx.state.collection.classrooms.findOneAndUpdate({ code: classroomCode }, {
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
    get: async(ctx, next) => {
        if(ctx.params.code == 0) ctx.body.data = await ctx.state.collection.classrooms.find().toArray();
        else ctx.body.data = await ctx.state.collection.classrooms.findOne({ code: parseInt(ctx.params.code, 10) });
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.classrooms.deleteOne({ code: parseInt(ctx.params.code, 10) });
        await next();
    },
    put: async(ctx, next) => {
        if(!isNumber(ctx.request.body.limit)) ctx.throw(400);
        const individualArray = JSON.parse(ctx.request.body.individual);
        const groupArray = JSON.parse(ctx.request.body.group);
        if(!Array.isArray(individualArray) || !Array.isArray(groupArray)) ctx.throw(400);
        individualArray.forEach(allow => { if(allow != 0 && allow != 1) ctx.throw(400); })
        groupArray.forEach(allow => { if(allow != 0 && allow != 1) ctx.throw(400); })

        await ctx.state.collection.teachers.findOneAndUpdate({ code: parseInt(ctx.params.code, 10) }, { $set: {
            moveseat: {
                limit: parseInt(ctx.request.body.limit, 10),
                individual: individualArray,
                group: groupArray
            }
        }});
        await next();
    },
    common: async (ctx, next) => {
        if(!isNumber(ctx.params.code) || ctx.params.code < 0) ctx.throw(400);
        await next();
    }
}