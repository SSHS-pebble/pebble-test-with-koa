const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const isNumber = require('is-number');
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
    // TODO
    // usernameField: "code",
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async ({ ctx }, username, password, done) => {
    if(!isNumber(username)) done(null, false);
    const user = await ctx.state.collection.users.findOne({ code: parseInt(username, 10) });
    
    if(!user || !await bcrypt.compare(password, user.password)) {
        done(null, false);
    }

    done(null, user);
}));
