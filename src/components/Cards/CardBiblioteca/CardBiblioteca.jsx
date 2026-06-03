import { Card, Button, Badge } from "react-bootstrap";

const CardBiblioteca = ({ game }) => {
    return (
        <Card text="white" key={game.id} style={{ width: '28rem', margin: "30px" }} className='mx-3'>
            <Card.Img variant="top" src={game.poster} />
            <Card.Body>
                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Button variant="success">Jugar</Button>
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
            </Card.Body>
        </Card >
    )
}

export default CardBiblioteca;