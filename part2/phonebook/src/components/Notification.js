const Notification = ({message,iserror}) =>{
    if(message == null){
        return null
    }
    const className = iserror ? "error": "success"
    return(
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification