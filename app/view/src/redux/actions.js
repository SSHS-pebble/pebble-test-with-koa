module.exports = {
    toggle: () => ({
        type: "TOGGLE_SOMETHING"
    }),
    toggleLoginDialog: () => ({
        type: "TOGGLE_LOGIN_DIALOG"
    }),
    inputToLoginDialog: (inputType, value) => ({
        type: "INPUT_TO_LOGIN_DIALOG",
        inputType,
        value
    }),
    blockLoginDialog: () => ({
        type: "BLOCK_LOGIN_DIALOG"
    }),
    allowLogin: () => ({
        type: "ALLOW_LOGIN"
    }),
    disallowLogin: () => ({
        type: "DISALLOW_LOGIN"
    }),
    toggleAccountMenu: event => ({
        type: "TOGGLE_ACCOUNT_MENU",
        anchorElement: event.currentTarget
    })
};