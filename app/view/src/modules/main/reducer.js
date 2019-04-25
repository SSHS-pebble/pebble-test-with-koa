const initialState = {
    isDrawerOpen: false,
    isNoticeOpen: true,
    isMoveSeatOpen: true,
    anchorElement: null
};

const handlers = {
    TOGGLE_DRAWER: (state, action) => ({
        ...state,
        isDrawerOpen: !state.isDrawerOpen
    }),
    TOGGLE_DRAWER_ITEM: (state, action) => ({
        ...state,
        [action.payload]: !state[action.payload]
    }),
    TOGGLE_ACCOUNT_MENU: (state, action) => ({
        ...state,
        anchorElement: !state.anchorElement ? action.payload : null
    })
};

module.exports = (state = initialState, action) => {
    const handler = handlers[action.type];
    if(!handler) { return state; }
    return handler(state, action);
};
