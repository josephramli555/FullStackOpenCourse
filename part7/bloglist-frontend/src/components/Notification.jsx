import { useNotifValue} from "../context/AppContext";

const Notification = () => {
    const {message,isError} = useNotifValue()
    if (message === null) {
      return null;
    }
    let className = isError ? "error" : "success";
    return <div className={className}>{message}</div>;
  };

export default Notification