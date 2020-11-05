export const C = {
   SET_SIDEBAR_TAB: "SET_SIDEBAR_TAB",
   TOGGLE_ACTIVE_AREA: "TOGGLE_ACTIVE_AREA"
}

export const setSidebarTab = tabId => ({
   type: C.SET_SIDEBAR_TAB,
   tabId
})

export const toggleActiveArea = status => ({
   type: C.TOGGLE_ACTIVE_AREA,
   status
})