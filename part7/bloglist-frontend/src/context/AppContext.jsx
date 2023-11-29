import {createContext,useContext,useReducer} from 'react'
import notificationReducer from '../reducers/notification'


const AppContext = createContext()

export const AppContextProvider = (props)=>{
    const [notification,notifDispatch]=useReducer(notificationReducer,{
        isError : false,
        message : null
    })

    const contextValue = [
        notification,
        notifDispatch,
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



export default AppContext