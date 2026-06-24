import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GamesContext } from '../../context/GamesProvider/GamesContext';

const ModalDelete = ({ game, onCerrar, show }) => {

    const { handleDelete } = useContext(GamesContext);

    const handleEliminar = () => {
        handleDelete(game)
        onCerrar()
    }

    return (
        <Modal show={show} onHide={onCerrar} data-bs-theme="dark" style={{ color: "white" }} centered>
            <Modal.Header closeButton>
                <Modal.Title>¿Desea eliminar {game.title} de la tienda?</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant="secondary" onClick={onCerrar}>Cerrar</Button>
                <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDelete;