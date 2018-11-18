const initialState = {
    emailText: "",
    passwordText: "",
    isLoggedIn: false,
    isLoginDialogOpen: false,
    isLoginDialogBlocked: false
};

module.exports = (state = initialState, action) => {
    switch(action.type) {
    case "TOGGLE_LOGIN_DIALOG": {
        return {
            ...state,
            isLoginDialogOpen: !state.isLoginDialogOpen
        };
    }
    case "INPUT_TO_LOGIN_DIALOG": {
        return {
            ...state,
            [action.inputType]: action.value
        };
    }
    case "BLOCK_LOGIN_DIALOG": {
        return {
            ...state,
            isLoginDialogBlocked: true
        };
    }
    case "ALLOW_LOGIN": {
        return {
            ...state,
            isLoggedIn: true,
            isLoginDialogOpen: false,
            isLoginDialogBlocked: false
        };
    }
    case "DISALLOW_LOGIN": {
        return {
            ...state,
            isLoggedIn: false,
            isLoginDialogBlocked: false
        };
    }
    default: {
        return state;
    }
    }
};
