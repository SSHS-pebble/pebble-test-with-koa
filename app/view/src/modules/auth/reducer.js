const initialState = {
    emailText: "",
    passwordText: "",
    isLoggedIn: false,
    isLoginDialogOpen: false,
    isLoginDialogBlocked: false
};

const handlers = {
    TOGGLE_LOGIN_DIALOG: (state, action) => ({
        ...state,
        isLoginDialogOpen: !state.isLoginDialogOpen
    }),
    INPUT_TO_LOGIN_DIALOG: (state, action) => ({
        ...state,
        [action.payload.inputType]: action.payload.value
    }),
    BLOCK_LOGIN_DIALOG: (state, action) => ({
        ...state,
        isLoginDialogBlocked: true
    }),
    ALLOW_LOGIN: (state, action) => ({
        ...state,
        isLoggedIn: true,
        isLoginDialogOpen: false,
        isLoginDialogBlocked: false
    }),
    DISALLOW_LOGIN: (state, action) => ({
        ...state,
        isLoggedIn: false,
        isLoginDialogBlocked: false
    })
};

module.exports = (state = initialState, action) => {
    const handler = handlers[action.type];
    if(!handler) { return state; }
    return handler(state, action);
};
