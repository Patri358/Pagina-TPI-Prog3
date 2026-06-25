import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import useModal from '../../../services/useModal/useModal';
import ModalDelete from '../../../ui/ModalDelete/ModalDelete';

const GenerosLista = ({ id, descripcion, onDeleteGenero, onUpdateGenero }) => {
    const { handleAbrir: handleAbrirGenero, handleCerrar: handleCerrarGenero, estadoModal: estadoModalGenero } = useModal();

    const [modoEdicion, setModoEdicion] = useState(false);
    // esto controla el valor si se está editando
    const [textoEditado, setTextoEditado] = useState(descripcion);

    const handleGuardar = () => {
        onUpdateGenero(id, textoEditado);
        setModoEdicion(false);
    };

    const handleCancelar = () => {
        // iguala el texto a la prop
        setTextoEditado(descripcion);
        setModoEdicion(false);
    };

    const handleTexto = (event) => {
        setTextoEditado(event.target.value)
    }

    return (
        <div style={{ width: "100%" }}>
            {estadoModalGenero && (
                <ModalDelete onCerrar={handleCerrarGenero} onConfirmar={() => onDeleteGenero(id)} show={estadoModalGenero} titulo={`¿Desea eliminar el género: ${descripcion}?`} />
            )}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "15px", width: "100%" }}>

                <div style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                    {modoEdicion ? (
                        <Form.Control type="text" size="sm" value={textoEditado} onChange={handleTexto} style={{ maxWidth: "180px", textAlign: "right" }}
                        />
                    ) : (
                        <h2 style={{ color: "white", margin: 0, fontSize: "1.2rem", textAlign: "right" }}>
                            {descripcion}
                        </h2>
                    )}
                </div>

                <div style={{ width: "50%", textAlign: "left", display: "flex", alignItems: "center" }}>
                    {modoEdicion ? (
                        <>
                            <Button onClick={handleGuardar} variant="success" size="sm">Guardar</Button>
                            <Button onClick={handleCancelar} variant="secondary" size="sm" style={{ marginLeft: "10px" }}>X</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleAbrirGenero} variant="danger" size="sm">Eliminar</Button>
                            <Button onClick={() => setModoEdicion(true)} variant="warning" size="sm" style={{ marginLeft: "10px" }}>Editar</Button>
                        </>
                    )}
                </div>

            </div>

            <hr style={{ color: "white", opacity: 0.2, marginTop: "12px", marginBottom: "12px" }} />
        </div>
    );
};

export default GenerosLista;