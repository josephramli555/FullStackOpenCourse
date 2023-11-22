const Notification = ({notification}) =>{
    const style = {
        border : '2px solid green',
        borderRadius : '15px',
        padding : '10px'
    }



    return (
        notification ?
        <div style={style}>
            {notification}
        </div> : 
        <div>
        </div>
    )
}

export default Notification