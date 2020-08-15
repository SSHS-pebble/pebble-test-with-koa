const bcrypt = require("bcrypt");
const isNumber = require('is-number');

module.exports = async(ctx, next) => {
    if(!isNumber(ctx.params.code) || ctx.params.code < 0 || ctx.request.body.password) ctx.throw(400);
    await ctx.state.collection.users.fineOneAndUpdate({ code: parseInt(ctx.params.code, 10) }, { $set: { password: await bcrypt.hash(ctx.request.body.password, 10) } });
    await next();
}