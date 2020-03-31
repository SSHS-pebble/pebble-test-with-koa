const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(({ ctx }, user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async ({ ctx }, _id, done) => {
    try {
        const user = await ctx.state.collection.users.findOne({
            _id: ObjectId(_id)
        });
        done(null, user);
    } catch(e) {
        done(e);
    }
});

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async ({ ctx }, username, password, done) => {
    const user = await ctx.state.collection.users.findOne({
        email: ctx.request.body.email
    });

    if(!user || !await bcrypt.compare(ctx.request.body.password, user.password)) {
        done(null, false);
    }

    done(null, user);
}));
