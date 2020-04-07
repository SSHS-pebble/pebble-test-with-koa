const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name || !ctx.request.body.department) ctx.throw(400);
        if(!isNumber(ctx.request.body.office)) ctx.throw(400);
        
        const office = await ctx.state.collection.classrooms.findOne({ code: parseInt(ctx.request.body.office, 10) });
        if(!office) ctx.throw(400);

        const teachers = await ctx.state.collection.teachers.find().toArray();
        var teacherCode = undefined;
        if(teachers.length == 0) teacherCode = 1;
        else teacherCode = teachers.map(teacherInfo => teacherInfo.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(teacherCode)) ctx.throw(500);
        
        await ctx.state.collection.teachers.findOneAndUpdate({ code: teacherCode }, {
            $setOnInsert: {
                name: ctx.request.body.name,
                department: ctx.request.body.department,
                office: office._id
            }
        });
        await next();
    },
    getMany: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.teachers.find().toArray();
        await next();
    },
    getOne: async (ctx, next) => {
        if(!isNumber(ctx.request.params.code)) ctx.throw(400);
        ctx.body.data = await ctx.state.collection.teachers.findOne({ code: parseInt(ctx.request.params.code, 10) });
        await next();
    },
    deleteOne: async (ctx, next) => {
        if(!isNumber(ctx.request.params.code)) ctx.throw(400);
        await ctx.state.collection.teachers.deleteOne({ code: parseInt(ctx.request.params.code, 10) });
        await next();
    },
    putOne: async (ctx, next) => {
        if(!isNumber(ctx.request.body.office) || !isNumber(ctx.request.params.code)) ctx.throw(400);
        const office = await ctx.state.collection.classrooms.findOne({ code: parseInt(ctx.request.body.office, 10) });
        if(!office) ctx.throw(400);

        await ctx.state.collection.teachers.findOneAndUpdate({ code: parseInt(ctx.request.params.code, 10) }, { $set: { office: office._id } });
        await next();
    }
}