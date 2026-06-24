import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = ({ onCerrar, onConfirmar, show, titulo }) => {

    const handleEliminar = () => {
        onCerrar()
        onConfirmar()
    }

    return (
        <Modal show={show} onHide={onCerrar} data-bs-theme="dark" style={{ color: "white" }} centered>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant="secondary" onClick={onCerrar}>Cerrar</Button>
                <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDelete;