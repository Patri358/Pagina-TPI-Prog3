import { Button, Card, Container } from "react-bootstrap";

const Perfil = ({ perfil }) => {
    return (
        // Container centra la tarjeta en la pantalla
        <Container className="d-flex justify-content-center my-4">
            <Card
                bg="dark"
                text="white"
                className="text-center p-4"
                style={{ width: '18rem', borderRadius: '10px' }}
            >
                <Card.Body className="d-flex flex-column align-items-center gap-2">
                    <Card.Title className="m-0">
                    {perfil?.username}
                    </Card.Title>
                    <Card.Text className="m-0 text-muted">
                        Email: {perfil?.email}
                    </Card.Text>
                    <Button variant="primary" className="mt-2">
                        Ver compras
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Perfil;