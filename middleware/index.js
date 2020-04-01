const { MongoClient, ObjectId } = require("mongodb");

module.exports = {
    getDB: async (ctx, next) => {
        const url = `mongodb+srv://${process.env.PEBBLE_DB_USER}:${process.env.PEBBLE_DB_PW}@sshs-pebble-wybih.gcp.mongodb.net/test?retryWrites=true&w=majority`;
        //const url = `mongodb://${process.env.PEBBLE_DB_USER}:${process.env.PEBBLE_DB_PW}@ds235243.mlab.com:35243/pebble-db`;
        ctx.state.client = await MongoClient.connect(url);
        ctx.state.db = ctx.state.client.db("pebble-db");
        ctx.state.collection = {};
        ctx.state.collection.users = ctx.state.db.collection("users");
        ctx.state.collection.classes = ctx.state.db.collection("classes");
        await next();
    },
    withAuth: async (ctx, next) => {
        if(!ctx.isAuthenticated()) {
            ctx.throw(401);
        }
        await next();
    }
};
