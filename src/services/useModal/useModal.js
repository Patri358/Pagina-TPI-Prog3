import { useState } from "react";

const useModal = () => {

    const [estadoModal, setEstadoModal] = useState(false)

    const handleAbrir = () => {
        setEstadoModal(true)
    }

    const handleCerrar = () => {
        setEstadoModal(false)
    }

    return {
        handleAbrir,
        handleCerrar,
        estadoModal
    }

}

export default useModal;
