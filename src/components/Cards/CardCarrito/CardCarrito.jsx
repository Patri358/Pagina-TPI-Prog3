import { Card, Button, Badge } from "react-bootstrap";

<<<<<<< HEAD:src/components/GameCard/GameCard.jsx
const GameCard = ({ game, onDetails, onDelete }) => {
=======
import { CartContext } from "../../../context/CartProvider/CartContext";
import { useContext } from "react";
>>>>>>> App:src/components/Cards/CardCarrito/CardCarrito.jsx

const CardCarrito = ({ game }) => {

    const { handleDelete } = useContext(CartContext)
    return (
        <Card text="white" key={game.id} style={{ width: '28rem', margin: "30px" }} className='mx-3'>
            <Card.Img variant="top" src={game.poster} />
            <Card.Body>
                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Badge>
                        ${game.price}
                    </Badge>
                </Card.Subtitle>

                <Card.Text>
                    {game.synopsis}
                </Card.Text>
                <Card.Subtitle className="text-center" style={{ marginBottom: "30px" }}>Distribuidor: {game.distributor}</Card.Subtitle>

                <Card.Text> Categoría: {game.rating} </Card.Text>

                <hr />

                <Card.Text>
                    <Badge >
                        Tags: #{game.tags.join(" #")}
                    </Badge>
                </Card.Text>

                <Card.Footer>
<<<<<<< HEAD:src/components/GameCard/GameCard.jsx
                    {/* botones que ve el admin | superadmin */}
                    <div className="d-flex gap-4 justify-content-center">
                        <Button variant="primary" onClick={() => onDetails?.(game)}>Detalles del juego</Button>
                        <Button variant="danger" onClick={() => onDelete?.(game)}>Eliminar juego </Button>
                    </div>
=======
>>>>>>> App:src/components/Cards/CardCarrito/CardCarrito.jsx

                    <Button onClick={() => handleDelete(game)} variant="danger" style={{ margin: "10px", width: "100%" }}>Eliminar del carrito</Button>
                </Card.Footer>
            </Card.Body>
        </Card >
    )
}

export default CardCarrito;