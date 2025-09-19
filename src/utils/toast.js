import {
    Bounce,
    toast
} from "react-toastify";

const toastError = (rejected) => {
    toast.error(rejected, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
const toastSuccess = (success) => {
    toast.success(success, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}


export {
    toastError,
    toastSuccess
}