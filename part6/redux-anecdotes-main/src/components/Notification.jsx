import { useSelector } from 'react-redux'

const Notification = () => {
    const notif = useSelector(({notification})=>notification)
    const style =  notif !== "" ? {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      borderColor : "green",
      borderStyle:"dotted",
      backgroundColor: "cyan"
    } : {
        display : 'none'
    }
    return (
      <div style={style}>
        {notif}
      </div>
    )
  }
  
  export default Notification