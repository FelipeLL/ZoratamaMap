import { toast } from "react-toastify";


export const alertError = (error) => {
    toast.error(`${error}`, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
    });
}

export const alertSuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
    });
}

export const alertWarning = (message) => {
    toast.warning(message, {
        position: toast.POSITION.TOP_LEFT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
    });
}

export const alertInfo = (message) => {
    toast.info(message, {
        position: toast.POSITION.TOP_LEFT,
        closeOnClick: false,
        theme: "colored",
        autoClose: 3000,
    });
}