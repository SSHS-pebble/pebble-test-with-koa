module.exports = {
    toggleDrawer: () => ({
        type: "TOGGLE_DRAWER"
    }),
    toggleDrawerItem: itemName => ({
        type: "TOGGLE_DRAWER_ITEM",
        payload: "is" + itemName + "Open"
    }),
    toggleAccountMenu: target => ({
        type: "TOGGLE_ACCOUNT_MENU",
        payload: target
    })
};
