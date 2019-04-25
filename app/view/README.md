# Pebble Frontend
## Project Structure

The entry file is [src/index.jsx](src/index.jsx).
[src/index.jsx](src/index.jsx) imports component App from [src/components/app.jsx](src/components/app.jsx), which is just a wrapper component of Main.
HOCs that need to go to top level, such as [`BrowserRouter`](https://reacttraining.com/react-router/web/api/BrowserRouter),
[`MuiThemeProvider`](https://material-ui.com/api/mui-theme-provider/), or [`CssBaseline`](https://material-ui.com/api/css-baseline/) must go here.

To structure the project in a scalable way, the code is splitted by features.
Features are grouped in directories in [src/modules](src/modules), such as [src/modules/auth](src/modules/auth).
All components are defined in an subdirectory called [components](src/modules/auth/components/),
and a main file [index.js](src/modules/auth/components/index.js) collects and re-exports them. 
Action creators that dispatch [actions](https://redux.js.org/basics/actions) when called are defined in [actions.js](src/modules/auth/actions.js).
Components can import action creators both from self and other modules.
[Reducers](https://redux.js.org/basics/reducers) that update [state](https://reactjs.org/docs/state-and-lifecycle.html) are defined in [reducer.js](src/modules/auth/reducer.js).
Components, action creators, and reducers are collected and re-exported in a main file [index.js](src/modules/auth/index.js).
Reducers are collected and re-exported in [src/modules/reducer.js](src/modules/reducer.js), and is used in making a redux [store](https://redux.js.org/basics/store).
