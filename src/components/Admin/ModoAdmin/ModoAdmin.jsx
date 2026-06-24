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
    const { generosDescripcion, setGenerosDescripcion, games } = useContext(GamesContext);

    const traerToken = () => {
        return localStorage.getItem("token");
    };

    // usuarios
    useEffect(() => {
        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

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
                // verifica si devuelve un array
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Error en el backend, datos corruptos: ", data);
                }
            })
            .catch((err) => {
                errorToast("Error en el fetch de usuarios:", err)
            });
    }, []);

    const handleUpdateRol = (nuevoRol, usuarioId) => {

        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

        fetch(`http://localhost:3001/users/${usuarioId}/rol`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
                )
            })
            .catch((err) => {
                errorToast("Error al actualizar el rol: ", err)
            })
    };

    const handleDeleteUser = (id) => {
        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

        fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al eliminar el usuario o permisos insuficientes");
                }
                return res.json().catch(() => ({}));
            })
            .then(() => {
                // actualizo el front si todo está ok
                setUsers((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
                successToast(`Usuario eliminado con éxito`);
            })
            .catch((err) => {
                console.error("Error al eliminar usuario: ", err);
                errorToast(err.message || "Error en el servidor");
            });
    };

    // generos

    const handleAgregarGenero = () => setAgregarGenero(true);
    const handleCancelarAgregar = () => setAgregarGenero(false);

    const handleDeleteGenero = (id) => {

        if (!id) {
            errorToast("ID inválido")
            return;
        }

        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            errorToast("Sesión inválida o expirada.");
            return;
        }

        fetch(`http://localhost:3001/generos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No se pudo eliminar el género");
                }
                // por si el backend responde sin el json
                return res.json().catch(() => ({}));
            })
            .then(() => {
                successToast("Género borrado")
                setGenerosDescripcion((prevGeneros) => prevGeneros.filter((G) => G.id !== id))
            })
            .catch((err) => {
                console.error(err)
                errorToast(err || "Error en el servidor al borrar el género")
            })

    };


    // juegos
    const handleAddGame = () => {
        navigate("/gameForm");
    };

    return (
        <Tabs defaultActiveKey="users" id="ventanas-admin" className="mb-3" fill>

            {/* usuarios */}
            <Tab eventKey="users" title="Usuarios">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    {users.map((usuario) => (
                        <UserCard key={usuario.id} user={usuario} esSuperAdmin={esSuperAdmin} onUpdateRol={handleUpdateRol} onDeleteUser={handleDeleteUser} />
                    ))}
                </div>
            </Tab>

            {/* generos  */}
            <Tab eventKey="generos" title="Géneros">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    <Button onClick={agregarGenero ? handleCancelarAgregar : handleAgregarGenero} variant={agregarGenero ? "danger" : "primary"} style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                        {
                            agregarGenero ? "Cancelar" : "Agregar Género"
                        }
                    </Button>

                    {generosDescripcion.map((genero) => (
                        <GenerosLista key={genero.id} id={genero.id} descripcion={genero.descripcion} estaAgregando={agregarGenero} onDeleteGenero={handleDeleteGenero} />
                    ))}
                </div>
            </Tab>

            {/* juegos */}
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