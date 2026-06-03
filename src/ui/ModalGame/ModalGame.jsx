import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalGame = () => {

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default ModalGame;



/*
            { modalAbiertoDetalles && <GameDetail game={gameSel} cerrarModalDetalles={cerrarModalDetalles} /> }
    {
        modalAbiertoEliminar &&
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    minWidth: '300px'
                }}>
                    <h3>¿Eliminar {gameSelEliminar?.title}?</h3>
                    <button style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => confirmarEliminar(gameSelEliminar.id)}
                    >Eliminar</button>
                    <button style={{ backgroundColor: '#ccc', color: '#333', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={cerrarModalEliminar}>
                        Cancelar
                    </button>
                </div>
            </div>
    }

*/