import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalGame = ({game}) => {

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>¿Desea eliminar {game.title} de la tienda?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button variant="secondary">Cerrar</Button>
                    <Button variant="primary">Eliminar</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default ModalGame;