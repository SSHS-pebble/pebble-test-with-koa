const initialState = {
    toggled: false
};

module.exports = (state = initialState, action) => {
    switch(action.type) {
    case "TOGGLE_SOMETHING": {
        return {
            ...state,
            toggled: !state.toggled
        };
    }
    default: {
        return state;
    }
    }
};
