import { Bounce, toast } from "react-toastify"

const defaultNotificationConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    draggable: false,
    pauseOnHover: true,
    theme: "dark",
    transition: Bounce
}

export const errorToast = (message, config) => {
    return toast.error(message,{
            ...defaultNotificationConfig,
            ...config
        })
}

export const successToast = (message, config) => {
    return toast.success(message, {
        ...defaultNotificationConfig,
        ...config
    })
}