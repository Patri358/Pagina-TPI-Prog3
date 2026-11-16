import { Card, Button, Badge } from "react-bootstrap";
import { successToast } from "../../../ui/Toast/Toast";

const CardBiblioteca = ({ game }) => {

    const handlePlay = () => {
        successToast("Gracias por jugar")
    }
    
    return (
        <Card text="white" key={game.id} style={{ width: '20rem', margin: "30px" }} className='mx-3 h-100 d-flex flex-column'>
            <Card.Img variant="top" src={game.poster} style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column flex-grow-1">
                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Button variant="success" onClick={handlePlay}>Jugar</Button>
                </Card.Subtitle>

                <hr className="mt-auto" />

            </Card.Body>
        </Card >
    )
}

export default CardBiblioteca;