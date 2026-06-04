import { Card } from "react-bootstrap";

const CardDetalle = ({ game }) => {

    return (
        <Card text="white" style={{ width: '28rem', margin: "30px" }} className='mx-3'>
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

                <Card.Text> Fecha de lanzamiento: {game.launch} </Card.Text>

                <Card.Text>
                    <Badge >
                        Tags: #{game.tags.join(" #")}
                    </Badge>
                </Card.Text>

                <Card.Footer>
                    <Button>Volver</Button>
                </Card.Footer>
            </Card.Body>
        </Card >
    )
}

export default CardDetalle;