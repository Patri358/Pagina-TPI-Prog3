import { useState } from "react";

const useModal = (valorInicial = false) => {

    const [estadoModal, setEstadoModal] = useState(valorInicial)

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
