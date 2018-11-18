const React = require("react");
const {
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Switch,
    Toolbar,
    Typography,
    withStyles
} = require("@material-ui/core");
const {
    Menu: MenuIcon,
    AccountCircle: AccountIcon
} = require("@material-ui/icons");
const { connect } = require("react-redux");

const LoginDialog = require("./login-dialog.jsx");

const actions = require("../redux/actions.js");

const styles = {
    menuButton: {
        margin: [[0, 12, 0, -12]]
    },
    mainBarTitle: {
        flexGrow: 1
    }
};

module.exports = withStyles(styles)(connect(state => state, actions)(props => (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" className={props.classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={props.classes.mainBarTitle}>
            Dashboard
          </Typography>
          <Switch onChange={event => props.toggle()} checked={props.toggler.toggled} />
          {props.login.isLoggedIn ?
           <div>
             <IconButton color="inherit" onClick={props.toggleAccountMenu}>
               <AccountIcon />
             </IconButton>
             <Menu anchorEl={props.accountMenu.anchorElement} open={Boolean(props.accountMenu.anchorElement)} onClose={props.toggleAccountMenu}>
               <MenuItem>Profile</MenuItem>
               <MenuItem>Logout</MenuItem>
             </Menu>
           </div> :
           <Button color="inherit" onClick={props.toggleLoginDialog}>Login</Button>}
        </Toolbar>
      </AppBar>
      <LoginDialog />
    </div>
)));
