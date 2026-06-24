import { useContext, useState } from "react";
import { Button, Card, Container, ListGroup } from "react-bootstrap";
import { BibliotecaContext } from "../../context/BibliotecaProvider/BibliotecaContext";

const Perfil = ({ perfil }) => {

    const { myGames } = useContext(BibliotecaContext);

    const [mostrarJuegos, setMostrarJuegos] = useState(false);

    const handleVerJuegos = () => {
        setMostrarJuegos(!mostrarJuegos)
    }

    return (
        <Container className="d-flex flex-column align-items-center my-4 gap-3">
            <Card bg="dark" text="white" className="text-center p-4" style={{ width: '18rem', borderRadius: '10px' }}>
                <Card.Body className="d-flex flex-column align-items-center gap-2">
                    <Card.Title className="m-0">
                        {perfil.username}
                    </Card.Title>
                    <Card.Text className="m-0 text-muted">
                        Email: {perfil.email}
                    </Card.Text>

                    <Button variant="primary" className="mt-2" onClick={handleVerJuegos}>
                        {mostrarJuegos ? "Ocultar juegos" : "Ver mis juegos"}
                    </Button>
                </Card.Body>
            </Card>

            {/* 4. Renderizamos los juegos de 'myGames' en tiempo real */}
            {mostrarJuegos && (
                <Card bg="dark" text="white" style={{ width: '18rem' }} className="p-2">
                    <Card.Header className="text-center">Mi Biblioteca ({myGames.length})</Card.Header>
                    <ListGroup variant="flush">
                        {myGames.length === 0 ? (
                            <ListGroup.Item className="bg-secondary text-white text-center italic">
                                Aún no tienes juegos
                            </ListGroup.Item>
                        ) : (
                            myGames.map((juego) => (
                                <ListGroup.Item
                                    key={juego.id}
                                    className="bg-secondary text-white d-flex align-items-center gap-2"
                                >
                                    {juego.poster && (
                                        <img
                                            src={juego.poster}
                                            alt={juego.title}
                                            style={{ width: '30px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    )}
                                    <span>{juego.title}</span>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </Card>
            )}
        </Container>
    );
};

export default Perfil;