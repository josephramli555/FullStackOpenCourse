const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

export const setUser = ({username,name,token})=>{
    return {
        type : "SET_USER",
        payload : {
            username,name,token
        }
    }
}


export const logoutUser = ()=>{
    return {
        type : "LOGOUT"
    }
}

export default userReducer