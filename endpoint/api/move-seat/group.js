const { ObjectId } = require("mongodb");
const { isSameDay } = require("date-fns");
const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        const classCode = parseInt(ctx.request.body.classCode, 10);
        const classInfo = await ctx.state.collection.classes.findOne({ code: classCode });
        if(((1 << (ctx.state.user.grade-1)) & classInfo.moveseat.group) == 0) ctx.throw(400);
        const count = await ctx.state.collection.moveSeatState.countDocuments({ classcode: classCode });
        if(!ctx.request.body.users || !classInfo || count >= 1) ctx.throw(400);
        
        const users = JSON.parse(ctx.request.body.users);
        if(!Array.isArray(users)) ctx.throw(400);
        if(users.length == 0 || users.length+1 > classInfo.moveseat.limit) ctx.throw(400);

        const userinfo = await Promise.all(
            users.map(async (user) => {
                if(!isNumber(user)) ctx.throw(400);
                const ithuser = await ctx.state.collection.users.findOne({ code: user });
                if(!ithuser) ctx.throw(403);
                ithuser.password = undefined;
                if(((1 << (ithuser.grade-1)) & classInfo.moveseat.group) == 0) ctx.throw(400);
                return ithuser;
            })
        );

        await ctx.state.collection.moveSeatState.findOneAndUpdate({ 'primary.email': ctx.state.user.email },
            { $setOnInsert:
                {
                    classcode: classCode,
                    primary: { password: undefined, ...ctx.state.user },
                    secondary: userinfo
                }
            }, { upsert: true }
        );
        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.moveSeatState.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        await ctx.state.collection.moveSeatState.deleteOne({ 'primary.email': ctx.state.user.email });
        await next();
    },
    put: async (ctx, next) => {
        if(!isNumber(ctx.request.body.userInfo) || !isNumber(ctx.request.body.operation)) ctx.throw(400);
        const moveSeatInfo = await ctx.state.collection.moveSeatState.findOne({ 'primary.email': ctx.state.user.email });
        if(!moveSeatInfo) ctx.throw(400);
        const userIndex = moveSeatInfo.secondary.findIndex(element => (element.code == parseInt(ctx.request.body.userInfo, 10)));

        if(ctx.request.body.operation == -1) {
            if(userIndex == -1 || moveSeatInfo.secondary.length < 2) ctx.throw(400);
            moveSeatInfo.secondary.splice(userIndex, 1);
        } else if(ctx.request.body.operation == 1) {
            if(userIndex == -1) {
                const classInfo = await ctx.state.collection.classes.findOne({ code: parseInt(ctx.request.body.classCode, 10) });
                if(!classInfo || moveSeatInfo.secondary.length+2 > classInfo.moveseat.limit) ctx.throw(400);
                const addUserInfo = await ctx.state.collection.users.findOne({ code: parseInt(ctx.request.body.userInfo, 10)});
                if(!addUserInfo) ctx.throw(400);
                if(((1 << (addUserInfo.grade-1)) & classInfo.moveseat.group) == 0) ctx.throw(400);
                addUserInfo.password = undefined;
                moveSeatInfo.secondary.push(addUserInfo);
            }
        } else ctx.throw(400);

        await ctx.state.collection.moveSeatState.updateOne({ 'primary.email': ctx.state.user.email }, { $set: { secondary: moveSeatInfo.secondary } });
        await next();
    },
    common: async (ctx, next) => {
        if(!isNumber(ctx.request.body.classCode) || ctx.request.body.classCode <= 0) ctx.throw(400);
        if(!ctx.state.user) ctx.throw(400);

        ctx.state.collection.moveSeatState = ctx.state.db.collection(`move-seat-group`);
        const randomDoc = (await ctx.state.collection.moveSeatState.aggregate([{
            $sample: {
                size: 1
            }
        }]).toArray())[0];
        if(!randomDoc || !isSameDay(new ObjectId(randomDoc._id).getTimestamp(), new Date())) {
            await ctx.state.collection.moveSeatState.deleteMany({});
        }

        await next();
    }
};
