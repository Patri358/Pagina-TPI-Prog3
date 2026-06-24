import { Card, Button, Badge } from "react-bootstrap";
import ModalDetalle from "../../../ui/modalDetalle/ModalDetalle.jsx"
import useModal from "../../../services/useModal/useModal";

const CardCarrito = ({ game }) => {

    const { handleAbrir: handleAbrirDetalle, handleCerrar: handleCerrarDetalle, estadoModal: estadoModalDetalle } = useModal()

    return (
        <Card text="white" key={game.id} style={{ width: '28rem', margin: "30px" }} className='mx-3'>
            <Card.Img variant="top" src={game.poster} />
            <Card.Body>
                <Card.Title className="text-center">{game.title}</Card.Title>

                {
                    estadoModalDetalle && <ModalDetalle game={game} onCerrar={handleCerrarDetalle} show={estadoModalDetalle} />
                }

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Badge bg="success">
                        {game.price === 0 ? "Gratuito" : `$${game.price}`}
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
                        Géneros: #{(game.Generos ?? [])
                            .map((genero) => typeof genero === "string" ? genero : genero.descripcion)
                            .join(" #")}
                    </Badge>
                </Card.Text>

                <Card.Footer>
                    <Button onClick={handleAbrirDetalle} variant="primary" style={{ margin: "10px", width: "100%" }}>Detalles del juego</Button>
                </Card.Footer>
            </Card.Body>
        </Card >
    )
}

export default CardCarrito;