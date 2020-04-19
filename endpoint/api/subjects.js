const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!isNumber(ctx.request.body.teacher) || !isNumber(ctx.request.body.classroom)) ctx.throw(400);
        const teacher = await ctx.state.collection.teacher.findOne({ code: parseInt(ctx.request.body.teacher, 10) });
        const classroom = await ctx.state.collection.classroom.findOne({ code: parseInt(ctx.request.body.classroom, 10) });
        if(!teacher || !classroom) ctx.throw(400);

        const subjects = await ctx.state.collection.subjects.find().toArray();
        var subjectCode = undefined;
        if(subjects.length == 0) subjectCode = 1;
        else subjectCode = subjects.map(subjectInfo => subjectInfo.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(subjectCode)) ctx.throw(500);

        await next();
    },
    get: async (ctx, next) => {
        await next();
    },
    delete: async (ctx, next) => {
        await next();
    },
    put: async (ctx, next) => {
        await next();
    },
    common: async (ctx, next) => {
        await next();
    }
}