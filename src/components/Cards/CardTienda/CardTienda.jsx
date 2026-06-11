import { Card, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../../context/CartProvider/CartContext";

const CardTienda = ({ game, onDetails, onDelete }) => {

    const { handleCart } = useContext(CartContext);

    return (
        <Card text="white" key={game.id} style={{ width: '28rem', marginTop: "30px" }} className='mx-3'>
            <Card.Img variant="top" src={game.poster} />
            <Card.Body>
                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Badge bg="success">
                        ${game.price}
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
                        Tags: #{game.tags.join(" #")}
                    </Badge>
                </Card.Text>

                <Card.Footer>
                    {/* boton que ve el admin | superadmin */}
                    <div className="d-flex justify-content-center">
                        <Button variant="danger" onClick={() => onDelete?.(game)} >Eliminar de la tienda</Button>
                    </div>

                    <Button style={{ margin: "10px", width: "100%" }} variant="primary" onClick={() => onDetails?.(game)} >Detalles del juego</Button>
                    <Button onClick={() => handleCart(game)} variant="light" style={{ margin: "10px", width: "100%" }}>Comprar juego</Button>
                </Card.Footer>
            </Card.Body>
        </Card >
    )
}

export default CardTienda;