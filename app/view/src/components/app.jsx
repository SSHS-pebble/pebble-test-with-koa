const React = require("react");
const ReactDOM = require("react-dom");
const { CssBaseline } = require("@material-ui/core");
const { BrowserRouter } = require("react-router-dom");
const { Provider } = require("react-redux");

const Main = require("./main.jsx");
const store = require("../redux/store.js");

module.exports = props => (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </React.Fragment>
);
