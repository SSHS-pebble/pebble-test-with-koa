const initialState = {
    isDrawerOpen: false,
    isNoticeOpen: true,
    isMoveSeatOpen: true
};

module.exports = (state = initialState, action) => {
    switch(action.type) {
    case "TOGGLE_DRAWER": {
        return {
            ...state,
            isDrawerOpen: !state.isDrawerOpen
        };
    }
    case "TOGGLE_DRAWER_ITEM": {
        return {
            ...state,
            [action.name]: !state[action.name]
        };
    }
    default: {
        return state;
    }
    }
};
