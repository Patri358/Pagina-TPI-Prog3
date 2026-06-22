import { Card, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../../context/CartProvider/CartContext";
import { useNavigate } from "react-router-dom";
import { GamesContext } from "../../../context/GamesProvider/GamesContext";
import useModal from "../../../services/useModal/useModal";
import ModalDelete from "../../../ui/ModalDelete/ModalDelete";

const CardTienda = ({ game }) => {

    const navigate = useNavigate()

    const { handleCart } = useContext(CartContext);
    const { handleEdit } = useContext(GamesContext);

    const handleEditGame = () => {
        handleEdit()
        navigate("/gameForm")
    }

    const { handleAbrir, handleCerrar, estadoModal } = useModal()

    const esAdmin = true

    return (
        <Card text="white" style={{ width: '28rem', marginTop: "30px" }} className='mx-3'>

            <Card.Img variant="top" src={game.poster} />

            {estadoModal && <ModalDelete game={game} onCerrar={handleCerrar}></ModalDelete>}

            <Card.Body>


                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Badge bg="success">
                        {game.price === 0 ? "Gratuito" : `$${game.price}`}
                    </Badge>
                </Card.Subtitle>

                <Card.Text>
                    {game.synopsis}
                </Card.Text>

                <Card.Subtitle className="text-center" style={{ marginBottom: "30px" }}>
                    Distribuidor: {game.distributor}
                </Card.Subtitle>

                <Card.Text> Categoría: {game.rating} </Card.Text>

                <Card.Text>
                    <Badge pill bg="secondary">
                        Géneros: #{game.Generos.map((genero) => genero.descripcion).join(" #")}
                    </Badge>
                </Card.Text>

                <Card.Footer>
                    {/* boton que ve el admin | superadmin */}
                    {esAdmin && (
                        <div className="d-flex justify-content-center gap-4">
                            <Button variant="danger" onClick={handleAbrir} >Eliminar de la tienda</Button>
                            <Button variant="success" onClick={handleEditGame} >Editar juego</Button>
                        </div>
                    )}

                    <Button style={{ margin: "10px", width: "100%" }} variant="primary" >Detalles del juego</Button>
                    <Button onClick={() => handleCart(game)} variant="light" style={{ margin: "10px", width: "100%" }}>Añadir al carrito</Button>
                </Card.Footer>
            </Card.Body>

        </Card >
    )
}

export default CardTienda;