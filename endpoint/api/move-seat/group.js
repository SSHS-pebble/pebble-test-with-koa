const { ObjectId } = require("mongodb");
const isSameDay = require("date-fns/isSameDay");
const isNumber = require('is-number');

module.exports = {
    post: async (ctx, next) => {
        if(!isNumber(ctx.request.body.classCode) || ctx.request.body.classCode < 1) ctx.throw(400);
        const classCode = parseInt(ctx.request.body.classCode, 10);
        const classInfo = await ctx.state.collection.classrooms.findOne({ code: classCode });
        if(!classInfo || !classInfo.moveseat.group[ctx.state.user.grade-1]) ctx.throw(400);
        const count = await ctx.state.collection.moveSeatGroup.countDocuments({ classcode: classCode });
        
        if(!ctx.request.body.users || count >= 1) ctx.throw(400);
        if(ctx.state.user.moveSeatInfo && isSameDay(new ObjectId(ctx.state.user.moveSeatInfo.id).getTimestamp(), new Date())) ctx.throw(400);

        const usersArray = JSON.parse(ctx.request.body.users);
        if(!Array.isArray(usersArray)) ctx.throw(400);
        if(usersArray.length == 0 || usersArray.length+1 > classInfo.moveseat.limit) ctx.throw(400);

        const userInfo = await Promise.all(
            usersArray.map(user => {
                if(!isNumber(user)) ctx.throw(400);
                return ctx.state.collection.users.findOne({ code: user });
            })
        );
        userInfo.forEach(user => {
            if(!user || !classInfo.moveseat.group[user.grade-1]) ctx.throw(400);
            if(user.moveSeatInfo && isSameDay(new ObjectId(user.moveSeatInfo).getTimestamp(), new Date())) ctx.throw(400);
        });

        const insertDoc = await ctx.state.collection.moveSeatGroup.findOneAndUpdate({ primary: ctx.state.user.code }, { $setOnInsert: { classCode: classCode, secondary: userInfo.map(user => user.code) } }, { upsert: true, returnOriginal: false } );
        if(insertDoc.ok != 1) ctx.throw(400);
        userInfo.push(ctx.state.user);
        await Promise.all(
            userInfo.map(user => {
                return ctx.state.collection.users.findOneAndUpdate({ code: user.code }, { $set: {
                    moveSeatInfo: {
                        id: insertDoc.value._id,
                        type: 1
                    }
                }});
            })
        );

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
        await Promise.all(
            moveSeatInfo.secondary.map(user => {
                return ctx.state.collection.users.findOneAndUpdate({ code: user }, { $set: { moveSeatInfo: undefined } });
            })
        );
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
                await ctx.state.collection.users.findOneAndUpdate({ code: addUserInfo.code }, { $set: { 
                    moveSeatInfo: {
                        id: insertDoc.value._id,
                        type: 1
                    }
                }});
            }
        } else ctx.throw(400);

        await ctx.state.collection.moveSeatGroup.findOneAndUpdate({ primary: ctx.state.user.code }, { $set: { secondary: moveSeatInfo.secondary } });
        await next();
    },
    common: async (ctx, next) => {
        ctx.state.user = await ctx.state.collection.users.findOne({ code: 10 });
        if(!ctx.state.user) ctx.throw(400);

        const randomDoc = (await ctx.state.collection.moveSeatGroup.aggregate([{ $sample: { size: 1 } }]).toArray())[0];
        if(!randomDoc || !isSameDay(new ObjectId(randomDoc._id).getTimestamp(), new Date())) {
            const allDoc = await ctx.state.collection.moveSeatGroup.find().toArray();
            const initUsersArray = allDoc.reduce((acc, cur) => {
                acc.push(cur.primary);
                acc.push.apply(acc, cur.secondary);
                return acc;
            }, []);
            await Promise.all( 
                initUsersArray.map(userInfo => {
                    return ctx.state.collection.users.findOneAndUpdate({ code: userInfo }, { $set: { moveSeatInfo: undefined } } );
                })
            );
            await ctx.state.collection.moveSeatGroup.deleteMany();
        }

        await next();
    }
};
