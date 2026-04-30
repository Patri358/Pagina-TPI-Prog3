import { Card, Button, Badge } from "react-bootstrap";

const GameCard = ({ id, game }) => {

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
                        <Button variant="primary">Detalles del juego</Button>
                        <Button variant="danger">Eliminar juego </Button>
                    </div>

                    <Button variant="light" style={{ margin: "10px", width: "100%" }}>Comprar juego</Button>
                </Card.Footer>
            </Card.Body>
        </Card >
    )
}

export default GameCard;


{/* Faltan agregar los handleFunction
                <button onClick={() => abrirModalDetalles(game)}>
                Detalles del juego
                </button>

                <button onClick={() => abrirModalEliminar(game)}>
                Eliminar juego
                </button>

                <button onClick={() => handleAgregar(game)}> 
                Comprar juego
                </button>
*/}