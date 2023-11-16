export const setFilter = (filter)=>{
    if(filter===''){
        return {
            type : "FILTER_ALL",
            payload : ""
        }
    }else if(filter.length>0){
        return {
            type : "FILTER_SPECIFIC",
            payload : filter
        }
    }
}

const filterReducer = (state ='', action) => {
    switch (action.type) {
        case "FILTER_SPECIFIC":
            return action.payload
        case "FILTER_ALL":
            return ''
        default:
            return state
    }
}

export default filterReducer