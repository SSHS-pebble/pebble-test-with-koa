const { ObjectId } = require("mongodb");
const isSameDay = require("date-fns/isSameDay");
const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!isNumber(ctx.request.body.classCode) || ctx.request.body.classCode < 1) ctx.throw(400);
        const classroom = await ctx.state.collection.classrooms.findOne({ code: parseInt(ctx.request.body.classCode, 10) });
        if(!classroom) ctx.throw(400);
        const count = await ctx.state.collection.moveSeatIndividual.countDocuments({ classCode: parseInt(ctx.request.body.classCode, 10) });
        if(count >= classroom.moveseat.limit) ctx.throw(400);
        if(ctx.state.user.moveSeatInfo && isSameDay(new ObjectId(ctx.state.user.moveSeatInfo).getTimestamp(), new Date())) ctx.throw(400);
        if(!classroom.moveseat.individual[ctx.state.user.grade-1]) ctx.throw(400);
        const insertDoc = await ctx.state.collection.moveSeatIndividual.findOneAndUpdate({ studentCode: ctx.state.user.code }, { $setOnInsert: { classCode: parseInt(ctx.request.body.classCode, 10) } }, { upsert: true, returnOriginal: false });
        if(insertDoc.ok != 1) ctx.throw(400);
        await ctx.state.collection.users.findOneAndUpdate({ code: ctx.state.user.code }, { $set: { moveSeatInfo: insertDoc.value._id }});
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.moveSeatIndividual.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        const moveSeatInfo = await ctx.state.collection.moveSeatIndividual.findOne({ studentCode: ctx.state.user.code });
        if(!moveSeatInfo) ctx.throw(400);
        await ctx.state.collection.users.findOneAndUpdate({ code: ctx.state.user.code }, { $set: { moveSeatInfo: undefined } });
        await ctx.state.collection.moveSeatIndividual.deleteOne({ studentCode: ctx.state.user.code });
        await next();
    },
    common: async (ctx, next) => {
        ctx.state.user = await ctx.state.collection.users.findOne({ code: 10 });
        if(!ctx.state.user) ctx.throw(400);
        
        const randomDoc = (await ctx.state.collection.moveSeatIndividual.aggregate([{ $sample: { size: 1 } }]).toArray())[0];
        if(!randomDoc || !isSameDay(new ObjectId(randomDoc._id).getTimestamp(), new Date())) {
            const allDoc = await ctx.state.collection.moveSeatIndividual.find().toArray();
            await Promise.all(
                allDoc.map(doc => {
                    return ctx.state.collection.users.findOneAndUpdate({ code: doc.studentCode }, { $set: { moveSeatInfo: undefined } } );
                })
            );
            await ctx.state.collection.moveSeatIndividual.deleteMany();
        }

        await next();
    }
};
