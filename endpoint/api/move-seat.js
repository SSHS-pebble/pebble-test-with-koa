const { ObjectId } = require("mongodb");
const { isSameDay } = require("date-fns");

module.exports = {
    post: async (ctx, next) => {
        if(ctx.params.code <= 3 && ctx.state.user.grade != ctx.params.code) {
            ctx.throw(403);
        }
        await ctx.state.collection.moveSeatState.findOneAndUpdate({ "user.email": ctx.state.user.email }, { $setOnInsert: { user: { password: undefined, ...ctx.state.user } } }, { upsert: true });
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.moveSeatState.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.moveSeatState.deleteOne({
            "user.email": ctx.state.user.email
        });

        await next();
    },
    common: async (ctx, next) => {
        if(!ctx.state.user || !ctx.state.user.grade || !ctx.params.code || ctx.params.code <= 0) return ctx.throw(404);

        ctx.state.collection.moveSeatState = ctx.state.db.collection(`move-seat-state-${ctx.params.code}`);
        const maxperson = await ctx.state.collection.classes.findOne({code: parseInt(ctx.params.code)}, {_id: 0, limit: 1});
        if(!maxperson) ctx.throw(403);
        const count = await ctx.state.collection.moveSeatState.countDocuments();
        const randomDoc = (await ctx.state.collection.moveSeatState.aggregate([{
            $sample: {
                size: 1
            }
        }]).toArray())[0];
        
        if(!randomDoc || !isSameDay(new ObjectId(randomDoc._id).getTimestamp(), new Date())) {
            await ctx.state.collection.moveSeatState.deleteMany({});
        } else if(ctx.method === "POST" && count >= maxperson.limit) {
            ctx.throw(403);
        }

        await next();
    }
};
