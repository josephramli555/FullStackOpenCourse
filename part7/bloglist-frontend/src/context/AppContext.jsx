import {createContext,useContext,useReducer} from 'react'
import notificationReducer from '../reducers/notification'
import userReducer from '../reducers/user'


const AppContext = createContext()

export const AppContextProvider = (props)=>{
    const [notification,notifDispatch]=useReducer(notificationReducer,{
        isError : false,
        message : null
    })
    const [user,userDispatch] = useReducer(userReducer,null)

    const contextValue = [
        notification,
        notifDispatch,
        user,
        userDispatch
    ]
    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useNotifValue = ()=>{
    const notifAndDispatch = useContext(AppContext)
    return notifAndDispatch[0]
}

export const useNotifDispatch = ()=>{
    const notifAndDispatch = useContext(AppContext)
    return notifAndDispatch[1]
}

export const useUserValue = ()=>{
    const userAndDispatch = useContext(AppContext)
    return userAndDispatch[2]
}

export const useUserDispatch = ()=>{
    const userAndDispatch = useContext(AppContext)
    return userAndDispatch[3]
}


export default AppContext