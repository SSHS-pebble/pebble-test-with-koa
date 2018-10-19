const { MongoClient, ObjectId } = require("mongodb");

module.exports = {
    getDB: async (ctx, next) => {
        const url = `mongodb://${process.env.PEBBLE_DB_USER}:${process.env.PEBBLE_DB_PW}@ds235243.mlab.com:35243/pebble-db`;
        ctx.client = await MongoClient.connect(url);
        ctx.db = ctx.client.db("pebble-db");
        ctx.userCollection = ctx.db.collection("users");
        await next();
    },
    withAuth: async (ctx, next) => {
        if(!ctx.isAuthenticated()) {
            ctx.throw(401);
        }
        await next();
    }
};
