const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name || ctx.params.code > 9) ctx.throw(400);
        if(!isNumber(ctx.request.body.credit)) ctx.throw(400);

        const departmentCode = parseInt(ctx.params.code, 10);
        const subjects = await ctx.state.collection.subjects.find({ code: { $gte: departmentCode*100, $lt: (departmentCode+1)*100 } }).toArray();
        var subjectCode = undefined;
        if(subjects.length == 0) subjectCode = departmentCode*100+1;
        else subjectCode = subjects.map(subjectInfo => subjectInfo.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(subjectCode)) ctx.throw(500);

        await ctx.state.collection.subjects.findOneAndUpdate({ code: subjectCode }, {
            $setOnInsert: {
                name: ctx.request.body.name,
                credit: parseInt(ctx.request.body.credit, 10),
                hours: parseInt(ctx.request.body.hours, 10),
                classes: ctx.state.array.classes
            }
        }, { upsert: true });
        await next();
    },
    get: async (ctx, next) => {
        if(ctx.params.code == 0) ctx.body.data = await ctx.state.collection.subjects.find().toArray();
        else ctx.body.data = await ctx.state.collection.subjects.findOne({ code: parseInt(ctx.params.code, 10) });
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.subjects.deleteOne({ code: parseInt(ctx.params.code, 10) });
        await next();
    },
    patch: async (ctx, next) => {
        await ctx.state.collection.subjects.findOneAndUpdate({ code: parseInt(ctx.params.code, 10) }, {
            $set: {
                hours: parseInt(ctx.request.body.hours, 10),
                classes: ctx.state.array.classes
            }
        });
        await next();
    },
    common: async (ctx, next) => {
        if(!isNumber(ctx.params.code) || ctx.params.code < 0) ctx.throw(400);

        if(ctx.method == "POST" || ctx.method == "PATCH") {
            if(!isNumber(ctx.request.body.hours) || !ctx.request.body.classes) ctx.throw(400);
            ctx.state.array = {};
            ctx.state.array.classes = JSON.parse(ctx.request.body.classes);
            if(!Array.isArray(ctx.state.array.classes)) ctx.throw(400);
            var teachersSet = new Set();
            var classroomsSet = new Set();
            ctx.state.array.classes.forEach(classInfo => {
                if(!Array.isArray(classInfo)) ctx.throw(400);
                if(classInfo.length != ctx.request.body.hours) ctx.throw(400);
                classInfo.forEach(timeInfo => {
                    if(!Array.isArray(timeInfo.teacher)) ctx.throw(400);
                    if(!isNumber(timeInfo.classroom)) ctx.throw(400);
                    classroomsSet.add(parseInt(timeInfo.classroom, 10));
                    timeInfo.teacher.forEach(teacherInfo => {
                        if(!isNumber(teacherInfo)) ctx.throw(400);
                        teachersSet.add(parseInt(teacherInfo, 10));
                    });
                });
            });
            const [teachersExist, classroomsExist] = await Promise.all([
                Promise.all(Array.from(teachersSet).map(teacherInfo => {
                    return ctx.state.collection.teachers.countDocuments({ code: teacherInfo });
                })),
                Promise.all(Array.from(classroomsSet).map(classroomInfo => {
                    return ctx.state.collection.classrooms.countDocuments({ code: classroomInfo });
                }))
            ]);
            if(teachersExist.includes(0) || classroomsExist.includes(0)) ctx.throw(400);
        }
        
        await next();
    }
}