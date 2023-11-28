const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIF":
            return action.payload
        default:
            return state
    }
}

export const createSuccessNotif = (message) => {
    return {
        type: "SET_NOTIF",
        payload: {
            message,
            isError: false,
        }
    }
}

export const createAlertNotif = (message) => {
    return {
        type: "SET_NOTIF",
        payload: {
            message,
            isError: true
        }
    }
}


export default notificationReducer