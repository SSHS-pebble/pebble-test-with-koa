const React = require("react");
const {
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    withStyles
} = require("@material-ui/core");
const { default: ReduxBlockUi } = require("react-block-ui/redux");
const { connect } = require("react-redux");
const axios = require("axios");
require("react-block-ui/style.css");

const styles = {
    dialogContent: {
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        width: 250
    }
};

const actions = require("../actions.js");

module.exports = withStyles(styles)(connect(state => ({ auth: state.auth }), actions)(props => (
    <div>
      <Dialog open={props.auth.isLoginDialogOpen} onClose={props.toggleLoginDialog}>
        <form>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <ReduxBlockUi block="BLOCK_LOGIN_DIALOG" unblock={["ALLOW_LOGIN", "DISALLOW_LOGIN"]} loader={<CircularProgress />} className={props.classes.dialogContent}>
              <TextField className={props.classes.textField} autoFocus type="email" margin="normal" placeholder="Email" onChange={event => props.inputToLoginDialog("emailText", event.target.value)} value={props.auth.emailText} />
              <TextField className={props.classes.textField} type="password" margin="normal" placeholder="Password" onChange={event => props.inputToLoginDialog("passwordText", event.target.value)} value={props.auth.passwordText} />
            </ReduxBlockUi>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.toggleLoginDialog}>Cancel</Button>
            <Button color="primary" onClick={event => {
                props.blockLoginDialog();
                axios.post("/auth/login", {
                    email: props.auth.emailText,
                    password: props.auth.passwordText
                }).then(response => props.allowLogin()).catch(error => props.disallowLogin());
            }}>Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
)));
