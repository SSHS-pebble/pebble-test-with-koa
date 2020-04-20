const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!ctx.request.body.name || ctx.params.code > 9) ctx.throw(400);
        if(!isNumber(ctx.request.body.hours) || !isNumber(ctx.request.body.credit)) ctx.throw(400);
        
        const classesArray = JSON.parse(ctx.request.body.classes);
        if(!Array.isArray(classesArray)) ctx.throw(400);
        var checkedTeachers = [];
        var checkedClasses = [];
        classesArray.forEach(classInfo => {
            if(!Array.isArray(classInfo)) ctx.throw(400);
            if(classInfo.length != ctx.request.body.hours) ctx.throw(400);
            classInfo.forEach(timeInfo => {
                if(!isNumber(timeInfo.classroom)) ctx.throw(400);
                if(!checkedClasses.includes(parseInt(timeInfo.classroom, 10))) {
                    const isClassRoomExist = await ctx.state.collection.classrooms.countDocuments({ code: parseInt(timeInfo.classroom, 10) });
                    if(isClassRoomExist == 0) ctx.throw(400);
                    else checkedClasses.push(parseInt(timeInfo.classroom, 10));
                }
                if(!Array.isArray(timeInfo.teacher)) ctx.throw(400);
                timeInfo.teacher.forEach(teacherInfo => {
                    if(!isNumber(teacherInfo)) ctx.throw(400);
                    if(!checkedTeachers.includes(parseInt(teacherInfo, 10))) {
                        const isClassRoomExist = await ctx.state.collection.teachers.countDocuments({ code: parseInt(teacherInfo, 10) });
                        if(isClassRoomExist == 0) ctx.throw(400);
                        else checkedTeachers.push(parseInt(teacherInfo, 10));
                    }
                });
            });
        });

        const departmentCode = parseInt(ctx.params.code, 10);
        const subjects = await ctx.state.collection.subjects.find({ code: { $gte: departmentCode*100, $lt: (departmentCode+1)*100 } }).toArray();
        var subjectCode = undefined;
        if(subjects.length == 0) subjectCode = 1;
        else subjectCode = subjects.map(subjectInfo => subjectInfo.code).sort((a, b) => b - a)[0]+1;
        if(!isNumber(subjectCode)) ctx.throw(500);
        subjectCode += departmentCode*100;

        await ctx.state.collection.subjects.findOneAndUpdate({ code: subjectCode }, {
            $setOnInsert: {
                name: ctx.request.body.name,
                credit: parseInt(ctx.request.body.credit, 10),
                hours: parseInt(ctx.request.body.hours, 10),
                classes: classesArray
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

        await next();
    },
    common: async (ctx, next) => {
        if(!isNumber(ctx.params.code) || ctx.params.code < 0) ctx.throw(400);
        await next();
    }
}