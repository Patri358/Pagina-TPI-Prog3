import { Card, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../../context/CartProvider/CartContext";

const CardCarrito = ({ game, onDetails }) => {

    const { handleDelete } = useContext(CartContext);

    
    const handleDetail = () => {

    }

    return (
        <Card text="white" key={game.id} style={{ width: '28rem', margin: "30px" }} className='mx-3'>
            <Card.Img variant="top" src={game.poster} />
            <Card.Body>
                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Badge bg="success">
                        {game.price === 0 ? "Gratuito" : `$${game.price}` }
                    </Badge>
                </Card.Subtitle>

                <Card.Text>
                    {game.synopsis}
                </Card.Text>
                <Card.Subtitle className="text-center" style={{ marginBottom: "30px" }}>Distribuidor: {game.distributor}</Card.Subtitle>

                <Card.Text> Categoría: {game.rating} </Card.Text>

                <hr />

                <Card.Text>
                    <Badge pill bg="secondary">
                        Géneros: #{game.Generos.map((genero) => genero.descripcion).join(" #")}
                    </Badge>
                </Card.Text>

                <Card.Footer>

                    <Button onClick={() => onDetails?.(game)} variant="primary" style={{ margin: "10px", width: "100%" }}>Detalles del juego</Button>
                    <Button onClick={() => handleDelete(game)} variant="danger" style={{ margin: "10px", width: "100%" }}>Eliminar del carrito</Button>

                </Card.Footer>
            </Card.Body>
        </Card >
    )
}

export default CardCarrito;