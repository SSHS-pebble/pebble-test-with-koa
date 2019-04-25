module.exports = {
    toggleLoginDialog: () => ({
        type: "TOGGLE_LOGIN_DIALOG"
    }),
    inputToLoginDialog: (inputType, value) => ({
        type: "INPUT_TO_LOGIN_DIALOG",
        payload: {
            inputType,
            value
        }
    }),
    blockLoginDialog: () => ({
        type: "BLOCK_LOGIN_DIALOG"
    }),
    allowLogin: () => ({
        type: "ALLOW_LOGIN"
    }),
    disallowLogin: () => ({
        type: "DISALLOW_LOGIN"
    })
};
