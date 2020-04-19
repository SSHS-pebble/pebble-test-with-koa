const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name) ctx.throw(400);
        if(!isNumber(ctx.request.body.office) || ctx.request.body.office < 1) ctx.throw(400);
        const isOfficeExist = await ctx.state.collection.classrooms.countDocuments({ code: parseInt(ctx.request.body.office, 10) });
        if(isOfficeExist == 0) ctx.throw(400);

        const departmentCode = parseInt(ctx.params.code, 10);
        const teachers = await ctx.state.collection.teachers.find({ code: { $gte: departmentCode*1000, $lt: (departmentCode+1)*1000 } }).toArray();
        var teacherCode = undefined;
        if(teachers.length == 0) teacherCode = 1;
        else teacherCode = teachers.map(teacherInfo => teacherInfo.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(teacherCode)) ctx.throw(500);
        teacherCode += departmentCode*1000;
        
        await ctx.state.collection.teachers.findOneAndUpdate({ code: teacherCode }, {
            $setOnInsert: {
                name: ctx.request.body.name,
                office: parseInt(ctx.request.body.office, 10)
            }
        });
        await next();
    },
    get: async (ctx, next) => {
        if(ctx.params.code == 0) ctx.body.data = await ctx.state.collection.teachers.find().toArray();
        else ctx.body.data = await ctx.state.collection.teachers.findOne({ code: parseInt(ctx.params.code, 10) });
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.teachers.deleteOne({ code: parseInt(ctx.params.code, 10) });
        await next();
    },
    put: async (ctx, next) => {
        if(!isNumber(ctx.request.body.office) || ctx.request.body.office < 1) ctx.throw(400);
        const isOfficeExist = await ctx.state.collection.classrooms.countDocuments({ code: parseInt(ctx.request.body.office, 10) });
        if(isOfficeExist == 0) ctx.throw(400);

        await ctx.state.collection.teachers.findOneAndUpdate({ code: parseInt(ctx.params.code, 10) }, { $set: { office: parseInt(ctx.request.body.office, 10) } });
        await next();
    },
    common: async (ctx, next) => {
        if(!isNumber(ctx.params.code) || ctx.params.code < 0) ctx.throw(400);
        await next();
    }
}