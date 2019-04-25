const { combineReducers } = require("redux");

module.exports = combineReducers({
    main: require("./main/index.js").reducer,
    auth: require("./auth/index.js").reducer
});
