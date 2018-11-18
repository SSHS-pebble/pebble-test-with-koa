const React = require("react");
const ReactDOM = require("react-dom");
const { CssBaseline } = require("@material-ui/core");
const { Provider } = require("react-redux");

const Main = require("./main.jsx");
const store = require("../redux/store.js");

module.exports = props => (
    <div>
      <CssBaseline />
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
);
