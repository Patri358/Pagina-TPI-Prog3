import { Card, Button, Badge } from "react-bootstrap";

const GameCard = ({ game, onDetails, onDelete }) => {

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
                    {/* botones que ve el admin | superadmin */}
                    <div className="d-flex gap-4 justify-content-center">
                        <Button variant="primary" onClick={() => onDetails?.(game)}>Detalles del juego</Button>
                        <Button variant="danger" onClick={() => onDelete?.(game)}>Eliminar juego </Button>
                    </div>

                    <Button onClick={() => handleDelete(game)} variant="danger" style={{ margin: "10px", width: "100%" }}>Eliminar del carrito</Button>
                </Card.Footer>
            </Card.Body>
        </Card >
    )
}

export default CardCarrito;