import { Card, Button, Badge } from "react-bootstrap";
import { successToast } from "../../../ui/Toast/Toast";

const CardBiblioteca = ({ game }) => {

    const handlePlay = () => {
        successToast("Gracias por jugar")
    }
    
    return (
        <Card text="white" key={game.id} style={{ width: '28rem', margin: "30px" }} className='mx-3'>
            <Card.Img variant="top" src={game.poster} />
            <Card.Body>
                <Card.Title className="text-center">{game.title}</Card.Title>

                <Card.Subtitle className="text-center fs-2 my-3" >
                    <Button variant="success" onClick={handlePlay}>Jugar</Button>
                </Card.Subtitle>

                <hr />

            </Card.Body>
        </Card >
    )
}

export default CardBiblioteca;