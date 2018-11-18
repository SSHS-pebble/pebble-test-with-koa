const { combineReducers } = require("redux");

module.exports = combineReducers({
    toggler: require("./toggle.js"),
    login: require("./login.js"),
    accountMenu: require("./account-menu.js")
});
