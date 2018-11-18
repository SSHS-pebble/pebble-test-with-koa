const initialState = {
    anchorElement: null
};

module.exports = (state = initialState, action) => {
    switch(action.type) {
    case "TOGGLE_ACCOUNT_MENU": {
        return {
            ...state,
            anchorElement: !state.anchorElement ? action.anchorElement : null
        };
    }
    default: {
        return state;
    }
    }
};
