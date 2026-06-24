import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider/CartContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDetalle = ({ game, onCerrar, show }) => {

    const { handleCart } = useContext(CartContext)

    return (
        <Modal show={show} onHide={onCerrar} centered data-bs-theme="dark" style={{ color: "white" }}>
            <Modal.Header closeButton>
                <Modal.Title>{game.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={game.poster} alt={game.title} style={{ width: '100%', borderRadius: '5px', marginBottom: '15px' }} />
                <p><strong>Distribuidor:</strong> {game.distributor}</p>
                <p><strong>Clasificación:</strong> {game.rating}</p>
                <p><strong>Sinopsis:</strong> {game.sinopsis || game.synopsis}</p>
                <p><strong>Géneros:</strong> #{(game.Generos ?? [])
                    .map((genero) => typeof genero === "string" ? genero : genero.descripcion)
                    .join(" #")}</p>
                <p><strong>Lanzamiento:</strong> {game.launch}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCerrar}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => { handleCart(game); onCerrar(); }}>
                    Añadir al carrito
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetalle;