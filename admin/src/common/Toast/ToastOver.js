import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export function ToastOverSuccess(message) {
    toast.success(message, { theme: "colored", toastId: 'success', })
}

export function ToastOverError(message) {
    toast.error(message, { theme: "colored", toastId: 'error', transition: Flip })
}