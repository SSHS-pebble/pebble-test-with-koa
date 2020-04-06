const { ObjectId } = require("mongodb");
const { isSameDay } = require("date-fns");
const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        const classInfo = await ctx.state.collection.classes.findOne({ code: parseInt(ctx.params.code, 10) });
        if(!classInfo) ctx.throw(400);
        const count = await ctx.state.collection.moveSeatState.countDocuments();
        if(count >= classInfo.moveseat.limit) ctx.throw(400);
        if(ctx.state.user.moveSeatInfo && isSameDay(new ObjectId(ctx.state.user.moveSeatInfo).getTimestamp(), new Date())) ctx.throw(400);
        if(!classInfo.moveseat.individual[ctx.state.user.grade-1]) ctx.throw(400);

        await ctx.state.collection.moveSeatState.findOneAndUpdate({ code: ctx.state.user.code }, { $setOnInsert: { classCode: parseInt(ctx.params.code, 10) } }, { upsert: true });
        const insertDoc = await ctx.state.collection.moveSeatState.findOne({ code: ctx.state.user.code });
        await ctx.state.collection.users.findOneAndUpdate({ code: ctx.state.user.code }, { $set: { moveSeatInfo: insertDoc._id } });
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.moveSeatState.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.users.findOneAndUpdate({ code: ctx.state.user.code }, { $set: { moveSeatInfo: undefined } });
        await ctx.state.collection.moveSeatState.deleteOne({ code: ctx.state.user.code });
        await next();
    },
    common: async (ctx, next) => {
        if(!ctx.state.user) ctx.throw(400);
        if(!isNumber(ctx.params.code) || ctx.params.code <= 0) ctx.throw(400);
        ctx.state.collection.moveSeatState = ctx.state.db.collection(`move-seat-individual-${ctx.params.code}`);

        const randomDoc = (await ctx.state.collection.moveSeatState.aggregate([{ $sample: { size: 1 } }]).toArray())[0];
        if(!randomDoc || !isSameDay(new ObjectId(randomDoc._id).getTimestamp(), new Date())) {
            const allDoc = await ctx.state.collection.moveSeatState.find().toArray();
            allDoc.forEach(async (doc) => {
                await ctx.state.collection.users.findOneAndUpdate({ code: doc.code }, { $set: { moveSeatInfo: undefined } } );
            });
            await ctx.state.collection.moveSeatState.deleteMany();
        }

        await next();
    }
};
