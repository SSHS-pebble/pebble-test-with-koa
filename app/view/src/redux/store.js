const { createStore, applyMiddleware } = require("redux");
const rootReducer = require("./reducers/index.js");
const { default: reduxMiddleware } = require("react-block-ui/reduxMiddleware");

module.exports = createStore(rootReducer, {}, applyMiddleware(require("react-block-ui/reduxMiddleware").default));
