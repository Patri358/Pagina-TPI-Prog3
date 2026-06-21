import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalGame = ({ game }) => {

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
                    <Button variant="primary">Cerrar</Button>
                    <Button variant="danger">Eliminar</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default ModalGame;