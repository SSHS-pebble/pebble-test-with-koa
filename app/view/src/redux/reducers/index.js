const { combineReducers } = require("redux");

module.exports = combineReducers({
    drawer: require("./drawer.js"),
    toggler: require("./toggle.js"),
    login: require("./login.js"),
    accountMenu: require("./account-menu.js")
});
