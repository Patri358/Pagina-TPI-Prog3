import { Card, Button, Badge, Form } from "react-bootstrap";

const UserCard = ({ user, esSuperAdmin, onUpdateRol, onDeleteUser }) => {

    const badgeColor = user.rol === "admin" || user.rol === "superAdmin" ? "danger" : "primary";

    const handleRol = (event) => {
        const nuevoRol = event.target.value
        // la funcion recibe el nuevo rol y el id del usuario
        onUpdateRol(nuevoRol, user.id)
    }

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
                        {
                            esSuperAdmin ? (
                                <Form.Select onChange={handleRol} size="sm" value={user.rol} className="bg-dark text-white border-secondary text-capitalize" style={{ width: 'auto', maxWidth: '130px' }}>
                                    <option value="user">Usuario</option>
                                    <option value="admin">Admin</option>
                                    <option value="superAdmin">SuperAdmin</option>
                                </Form.Select>
                            ) :
                                (<Badge bg={badgeColor} className="text-capitalize">
                                    {user.rol}
                                </Badge>)
                        }
                    </div>

                    <Card.Text className="text-muted small">
                        ID: {user.id}
                        <br />
                        Email: {user.email || "Sin información"}
                        <br />
                        Nombre Real: {user.nombre_real || "Sin información"}
                    </Card.Text>

                </div>
                {
                    esSuperAdmin &&
                    <Button onClick={() => { onDeleteUser(user.id) }} variant="outline-danger" size="sm" className="w-100 mt-3">
                        Eliminar usuario
                    </Button>
                }
            </Card.Body>
        </Card >
    );
};

export default UserCard;