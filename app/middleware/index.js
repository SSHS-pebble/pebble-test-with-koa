const { MongoClient, ObjectId } = require("mongodb");

module.exports = {
    getDB: async (ctx, next) => {
        const url = `mongodb://${process.env.PEBBLE_DB_USER}:${process.env.PEBBLE_DB_PW}@ds235243.mlab.com:35243/pebble-db`;
        ctx.state.client = await MongoClient.connect(url);
        ctx.state.db = ctx.state.client.db("pebble-db");
        ctx.state.collection = {};
        ctx.state.collection.users = ctx.state.db.collection("users");
        ctx.state.collection.moveSeatState = [1, 2, 3].map(index => ctx.state.db.collection("move-seat-state-" + index));
        await next();
    },
    withAuth: async (ctx, next) => {
        if(!ctx.isAuthenticated()) {
            ctx.throw(401);
        }
        await next();
    }
};
