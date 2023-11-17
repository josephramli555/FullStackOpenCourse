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

export const {setNotifText} = notificationSlice.actions
export default notificationSlice.reducer