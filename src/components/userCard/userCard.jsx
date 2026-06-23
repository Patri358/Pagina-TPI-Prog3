import { Card, Button, Badge } from "react-bootstrap";

const UserCard = ({ user }) => {
    
    const badgeColor = user.rol === "admin" || user.rol === "superAdmin"  ? "danger" : "primary";

    const handleDeleteUser = () => {

    }

    console.log(user)

    return (
        <Card
            className="bg-dark text-white border-secondary mb-3 shadow-sm h-100"
            style={{ minWidth: '250px' }}
        >
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Card.Title className="mb-0 text-truncate" title={user.username}>
                            {user.username}
                        </Card.Title>
                        <Badge bg={badgeColor} className="text-capitalize">
                            {user.rol}
                        </Badge>
                    </div>

                    <Card.Text className="text-muted small">
                        ID: {user.id || "N/A"}
                        <br />
                        Email: {user.email || "N/A"}
                        <br />
                        Nombre Real: {user.nombre_real || "N/A"}
                    </Card.Text>

                </div>

                <Button variant="outline-danger" size="sm" className="w-100 mt-3" onClick={handleDeleteUser}>
                    Eliminar usuario
                </Button>
            </Card.Body>
        </Card>
    );
};

export default UserCard;