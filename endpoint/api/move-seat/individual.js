const { ObjectId } = require("mongodb");
const { isSameDay } = require("date-fns");
const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        const classinfo = await ctx.state.collection.classes.findOne({ code: parseInt(ctx.params.code, 10) });
        if(!classinfo) ctx.throw(403);
        const count = await ctx.state.collection.moveSeatState.countDocuments();
        if(count >= classinfo.moveseat.limit) ctx.throw(400);
        if(ctx.state.user.moveSeatInfo.classCode != 0 && isSameDay(ctx.state.user.moveSeatInfo.date, new Date())) ctx.throw(400);

        if(((1 << (ctx.state.user.grade-1)) & classinfo.moveseat.individual) == 0) ctx.throw(400);
        await ctx.state.collection.moveSeatState.findOneAndUpdate({ code: parseInt(ctx.state.user.code, 10) }, { $setOnInsert: { password: undefined, ...ctx.state.user } }, { upsert: true });
        await ctx.state.collection.users.findOneAndUpdate({ code: parseInt(ctx.state.user.code, 10) }, { $set: { moveSeatInfo: { date: new Date(), classCode: parseInt(ctx.params.code, 10), type: "individual" } } } );
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.moveSeatState.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.moveSeatState.deleteOne({ code: parseInt(ctx.state.user.code, 10) });
        await next();
    },
    common: async (ctx, next) => {
        if(!ctx.state.user || !isNumber(ctx.state.user.grade)) ctx.throw(400);
        if(!isNumber(ctx.params.code) || ctx.params.code <= 0) ctx.throw(400);
        ctx.state.collection.moveSeatState = ctx.state.db.collection(`move-seat-individual-${ctx.params.code}`);

        const randomDoc = (await ctx.state.collection.moveSeatState.aggregate([{ $sample: { size: 1 } }]).toArray())[0];
        if(!randomDoc || !isSameDay(new ObjectId(randomDoc._id).getTimestamp(), new Date())) { await ctx.state.collection.moveSeatState.deleteMany({}); }

        const randomDocUser = (await ctx.state.collection.moveSeatUser.aggregate([{ $sample: { size: 1 } }]).toArray())[0];
        if(!randomDocUser || !isSameDay(new ObjectId(randomDocUser._id).getTimestamp(), new Date())) { await ctx.state.collection.moveSeatUser.deleteMany({}); }

        await next();
    }
};
