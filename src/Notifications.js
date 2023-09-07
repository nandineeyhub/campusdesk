import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const SuccessMsg = (msg) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_CENTER
      });
}
export const ErrorMsg = (error) => {
    toast.error(error, {
        position: toast.POSITION.TOP_CENTER
      });
}
