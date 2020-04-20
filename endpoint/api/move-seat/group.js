const { ObjectId } = require("mongodb");
const { isSameDay } = require("date-fns");
const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!isNumber(ctx.request.body.classCode) || ctx.request.body.classCode < 1) ctx.throw(400);
        const classCode = parseInt(ctx.request.body.classCode, 10);
        const classInfo = await ctx.state.collection.classrooms.findOne({ code: classCode });
        if(!classInfo || !classInfo.moveseat.group[ctx.state.user.grade-1]) ctx.throw(400);
        const count = await ctx.state.collection.moveSeatGroup.countDocuments({ classcode: classCode });
        
        if(!ctx.request.body.users || count >= 1) ctx.throw(400);
        if(ctx.state.user.moveSeatInfo && isSameDay(new ObjectId(ctx.state.user.moveSeatInfo).getTimestamp(), new Date())) ctx.throw(400);

        const usersArray = JSON.parse(ctx.request.body.users);
        if(!Array.isArray(usersArray)) ctx.throw(400);
        if(usersArray.length == 0 || usersArray.length+1 > classInfo.moveseat.limit) ctx.throw(400);

        const userInfo = await Promise.all(
            usersArray.map(async (user) => {
                if(!isNumber(user)) ctx.throw(400);
                const ithuser = await ctx.state.collection.users.findOne({ code: user });
                if(!ithuser) ctx.throw(403);
                if(!classInfo.moveseat.group[ithuser.grade-1]) ctx.throw(400);
                if(ithuser.moveSeatInfo && isSameDay(new ObjectId(ithuser.moveSeatInfo).getTimestamp(), new Date())) ctx.throw(400);
                return ithuser;
            })
        );

        await ctx.state.collection.moveSeatGroup.findOneAndUpdate({ primary: ctx.state.user.code },
            { $setOnInsert: { classCode: classCode, secondary: userInfo.map(user => user.code) } }, { upsert: true }
        );
        const insertDoc = await ctx.state.collection.moveSeatGroup.findOne({ primary: ctx.state.user.code });
        await ctx.state.collection.users.findOneAndUpdate({ code: ctx.state.user.code }, { $set: { moveSeatInfo: insertDoc._id } } );
        userInfo.forEach(async (user) => {
            await ctx.state.collection.users.findOneAndUpdate({ code: user.code }, { $set: { moveSeatInfo: insertDoc._id } } );
        });

        await next();
    },
    get: async (ctx, next) => {
        ctx.body.data = await ctx.state.collection.moveSeatGroup.find().toArray();
        await next();
    },
    delete: async (ctx, next) => {
        const moveSeatInfo = await ctx.state.collection.moveSeatGroup.findOne({ primary: ctx.state.user.code });
        if(!moveSeatInfo) ctx.throw(400);
        
        await ctx.state.collection.users.findOneAndUpdate({ code: ctx.state.user.code }, { $set: { moveSeatInfo: undefined } });
        moveSeatInfo.secondary.forEach(async (user) => {
            await ctx.state.collection.users.findOneAndUpdate({ code: user }, { $set: { moveSeatInfo: undefined } });
        });
        await ctx.state.collection.moveSeatGroup.deleteOne({ primary: ctx.state.user.code });
        await next();
    },
    patch: async (ctx, next) => {
        if(!isNumber(ctx.request.body.userInfo) || !isNumber(ctx.request.body.operation)) ctx.throw(400);
        if(ctx.request.body.userInfo < 1) ctx.throw(400);
        const moveSeatInfo = await ctx.state.collection.moveSeatGroup.findOne({ primary: ctx.state.user.code });
        if(!moveSeatInfo) ctx.throw(400);
        const userIndex = moveSeatInfo.secondary.findIndex(code => (code == parseInt(ctx.request.body.userInfo, 10)));
        
        if(ctx.request.body.operation == -1) {
            if(userIndex == -1 || moveSeatInfo.secondary.length < 2) ctx.throw(400);
            await ctx.state.collection.users.findOneAndUpdate({ code: moveSeatInfo.secondary[userIndex] }, { $set: { moveSeatInfo: undefined } } );
            moveSeatInfo.secondary.splice(userIndex, 1);
        } else if(ctx.request.body.operation == 1) {
            if(userIndex == -1) {
                const classInfo = await ctx.state.collection.classrooms.findOne({ code: moveSeatInfo.classCode });
                if(!classInfo || moveSeatInfo.secondary.length+2 > classInfo.moveseat.limit) ctx.throw(400);
                const addUserInfo = await ctx.state.collection.users.findOne({ code: parseInt(ctx.request.body.userInfo, 10)});
                if(!addUserInfo) ctx.throw(400);
                
                if(!classInfo.moveseat.group[addUserInfo.grade-1]) ctx.throw(400);
                if(addUserInfo.moveSeatInfo && isSameDay(new ObjectId(addUserInfo.moveSeatInfo).getTimestamp(), new Date())) ctx.throw(400);
                moveSeatInfo.secondary.push(addUserInfo.code);
                await ctx.state.collection.users.findOneAndUpdate({ code: addUserInfo.code }, { $set: { moveSeatInfo: moveSeatInfo._id } } );
            }
        } else ctx.throw(400);

        await ctx.state.collection.moveSeatGroup.findOneAndUpdate({ primary: ctx.state.user.code }, { $set: { secondary: moveSeatInfo.secondary } });
        await next();
    },
    common: async (ctx, next) => {
        if(!ctx.state.user) ctx.throw(400);

        const randomDoc = (await ctx.state.collection.moveSeatGroup.aggregate([{ $sample: { size: 1 } }]).toArray())[0];
        if(!randomDoc || !isSameDay(new ObjectId(randomDoc._id).getTimestamp(), new Date())) {
            const allDoc = await ctx.state.collection.moveSeatGroup.find().toArray();
            allDoc.forEach(async (doc) => {
                await ctx.state.collection.users.findOneAndUpdate({ code: doc.primary }, { $set: { moveSeatInfo: undefined } } );
                doc.secondary.forEach(async (secondaryUser) => {
                    await ctx.state.collection.users.findOneAndUpdate({ code: secondaryUser }, { $set: { moveSeatInfo: undefined } } );
                });
            });
            await ctx.state.collection.moveSeatGroup.deleteMany();
        }

        await next();
    }
};
