import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GamesContext } from '../../context/GamesProvider/GamesContext';

const ModalDelete = ({ game, onCerrar, show }) => {

    const { handleDelete } = useContext(GamesContext);

    const handleEliminar = () => {
        handleDelete(game)
    }

    const handleCerrar = () => {
        onCerrar()
    }

    return (
        <Modal show={!show} onHide={onCerrar} data-bs-theme="dark" style={{ color: "white" }}>
            <Modal.Dialog style={{ color: "white" }}>
                <Modal.Header closeButton>
                    <Modal.Title closeButton>¿Desea eliminar {game.title} de la tienda?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="primary" onClick={onCerrar}>Cerrar</Button>
                    <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal >
    );
};

export default ModalDelete;