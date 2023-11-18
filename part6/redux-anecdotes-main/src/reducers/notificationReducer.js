import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name : 'notification',
    initialState : '',
    reducers : {
        setNotifText(state,action){
            return action.payload
        }
    }
})

export const setNotification =(message,seconds)=>{
    return async(dispatch)=>{
        dispatch(setNotifText(message))
        setTimeout(()=>{
            dispatch(setNotifText(''))
        },seconds*1000)
    }
}

export const {setNotifText} = notificationSlice.actions
export default notificationSlice.reducer