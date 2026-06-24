import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import UserCard from '../../userCard/userCard';
import GenerosLista from '../generosLista/GenerosLista';
import JuegosLista from '../juegosLista/JuegosLista';
import { GamesContext } from '../../../context/GamesProvider/GamesContext';
import { errorToast, successToast } from '../../../ui/Toast/Toast';

const ModoAdmin = ({ esSuperAdmin }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [agregarGenero, setAgregarGenero] = useState(false);
    const { generosDescripcion, games } = useContext(GamesContext);

    const traerToken = () => {
        return localStorage.getItem("token");
    };

    // usuarios

    useEffect(() => {
        const token = traerToken();
        console.log("Token enviado en la petición:", `Bearer ${token}`);

        fetch("http://localhost:3001/users", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Datos recibidos del backend:", data);
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("El backend no devolvió un Array, devolvió esto:", data);
                }
            })
            .catch((err) => {
                console.error("Error atrapado en el fetch de usuarios:", err);
            });
    }, []);

    const handleUpdateRol = (nuevoRol, usuarioId) => {
        fetch(`http://localhost:3001/users/${usuarioId}/rol`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rol: nuevoRol })
        })
            .then((res) => {
                if (!res.ok) {
                    errorToast(`Error al actualizar el rol del usuario ${usuarioId}`);
                    return;
                }
                // Si la respuesta es ok, actualizo el front
                setUsers((prevUsuarios) =>
                    prevUsuarios.map((u) =>
                        u.id === usuarioId ? { ...u, rol: nuevoRol } : u
                    )
                );
            });
    };

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) {
                    errorToast("Error al eliminar el usuario");
                    return;
                }
                // Actualizo el front si todo es ok
                setUsers((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
                successToast(`Usuario con el id ${id} eliminado`);
            });
    };

    // generos

    const handleAgregarGenero = () => setAgregarGenero(true);
    const handleCancelarAgregar = () => setAgregarGenero(false);

    const handleDeleteGenero = () => {
        fetch("http://localhost:3001/generos");
    };

    const handleAddGame = () => {
        navigate("/gameForm");
    };

    return (
        <Tabs defaultActiveKey="users" id="ventanas-admin" className="mb-3" fill>

            <Tab eventKey="users" title="Usuarios">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    {users.map((usuario) => (
                        <UserCard
                            key={usuario.id}
                            user={usuario}
                            esSuperAdmin={esSuperAdmin}
                            onUpdateRol={handleUpdateRol}
                            onDeleteUser={handleDeleteUser}
                        />
                    ))}
                </div>
            </Tab>

            <Tab eventKey="generos" title="Géneros">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    <Button onClick={handleAgregarGenero} style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                        Agregar Género
                    </Button>

                    {agregarGenero && (
                        <Button onClick={handleCancelarAgregar} variant='danger' style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                            Cancelar
                        </Button>
                    )}

                    {generosDescripcion.map((genero) => (
                        <GenerosLista
                            key={genero.id}
                            descripcion={genero.descripcion}
                            estaAgregando={agregarGenero}
                        />
                    ))}
                </div>
            </Tab>

            <Tab eventKey="juegos" title="Juegos">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    <Button onClick={handleAddGame} style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                        Agregar Juego
                    </Button>

                    {games.map((game) => (
                        <JuegosLista key={game.id} game={game} />
                    ))}
                </div>
            </Tab>

        </Tabs>
    );
};

export default ModoAdmin;