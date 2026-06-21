import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GamesContext } from '../../context/GamesProvider/GamesContext';

const ModalDelete = ({ game, onCerrar }) => {

    const { handleDelete } = useContext(GamesContext);

    const handleEliminar = () => {
        handleDelete(game)
    }

    const handleCerrar = () => {
        onCerrar()
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog style={{ color: "white" }}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Desea eliminar {game.title} de la tienda?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleCerrar}>Cerrar</Button>
                    <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default ModalDelete;