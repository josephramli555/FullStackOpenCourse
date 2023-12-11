import { useNotifValue} from "../context/AppContext";
import { Alert } from "react-bootstrap";
const Notification = () => {
    const {message,isError} = useNotifValue()
    if (message === null) {
      return null;
    }
    let variant = isError ? "danger" : "success";
    return <Alert variant={variant} className="my-2">{message}</Alert>;
  };

export default Notification