const React = require("react");
const ReactDOM = require("react-dom");
const {
    CssBaseline,
    MuiThemeProvider
} = require("@material-ui/core");
const { createMuiTheme } = require("@material-ui/core/styles");
const { BrowserRouter } = require("react-router-dom");
const { Provider } = require("react-redux");

const Main = require("./main.jsx");
const store = require("../redux/store.js");

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

module.exports = props => (
    <React.Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Main />
          </MuiThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.Fragment>
);
