const { createStore, applyMiddleware } = require("redux");
const rootReducer = require("./reducer.js");

module.exports = createStore(rootReducer, {}, applyMiddleware(require("react-block-ui/reduxMiddleware").default));
