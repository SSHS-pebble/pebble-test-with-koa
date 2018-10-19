module.exports = async (ctx, next) => {
    if(!ctx.isAuthenticated()) {
        ctx.throw(401);
    }
    await next();
};
