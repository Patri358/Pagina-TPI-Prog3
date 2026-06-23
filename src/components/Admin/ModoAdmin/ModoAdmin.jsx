import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserCard from '../../userCard/userCard';
import { useContext, useState, useEffect } from 'react';
import { GamesContext } from '../../../context/GamesProvider/GamesContext';
import { errorToast, successToast } from '../../../ui/Toast/Toast';
import GenerosLista from '../generosLista/GenerosLista';
import JuegosLista from '../juegosLista/JuegosLista';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModoAdmin = ({ esSuperAdmin }) => {
    const navigate = useNavigate();

    // usuarios

    const [users, setUsers] = useState([])
    // trae todos los usuarios
    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err))
    }, [])

    const handleUpdateRol = (nuevoRol, usuarioId) => {
        fetch(`http://localhost:3001/users/${usuarioId}/rol`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({ rol: nuevoRol })
        })
            .then((res) => {
                if (!res.ok) {
                    errorToast(`Error al actualizar el rol del usuario ${usuarioId}`)
                    return
                }
                // si la respuesta es ok actualizo el front
                setUsers((prevUsuarios) => prevUsuarios.map((u) => {
                    return u.id === usuarioId ? {
                        ...u,
                        rol: nuevoRol
                    } : u
                }))

            })
    }

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE"
        })
            .then((res) => {
                if (!res.ok) {
                    errorToast("Error al eliminar el usuario")
                    return
                }
                // actualizo el front si todo es ok
                setUsers((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id))
                successToast(`Usuario con el id ${id} eliminado`)
            })
    }

    // generos
    const { generosDescripcion, setGenerosDescripcion, games } = useContext(GamesContext)

    const [agregarGenero, setAgregarGenero] = useState(false)

    const handleAgregarGenero = () => {
        setAgregarGenero(true)
    }

    const handleCancelarAgregar = () => {
        setAgregarGenero(false)
    }

    const handleDeleteGenero = () => {
        fetch("http://localhost:3001/generos")
    }

    // juegos

    const handleAddGame = () => {
        navigate("/gameForm")
    }


    return (
        <Tabs defaultActiveKey="users" id="ventanas-admin" className="mb-3" fill>

            <Tab eventKey="users" title="Usuarios">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    {
                        users.map((usuario) => {
                            return (
                                <UserCard key={usuario.id} user={usuario} esSuperAdmin={esSuperAdmin} onUpdateRol={handleUpdateRol} onDeleteUser={handleDeleteUser} />
                            )
                        })
                    }
                </div>
            </Tab>

            <Tab eventKey="generos" title="Géneros">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    <Button onClick={handleAgregarGenero} style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                        Agregar Género
                    </Button>
                    {
                        agregarGenero &&
                        <Button onClick={handleCancelarAgregar} variant='danger' style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                            Cancelar
                        </Button>
                    }
                    {
                        generosDescripcion.map((genero) => {
                            return (
                                <GenerosLista key={genero.id} descripcion={genero.descripcion} estaAgregando={agregarGenero} />
                            )
                        })
                    }
                </div>
            </Tab>

            <Tab eventKey="juegos" title="Juegos">
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px", maxWidth: "450px", margin: "0 auto" }}>
                    <Button onClick={handleAddGame} style={{ alignSelf: "center", paddingLeft: "30px", paddingRight: "30px", marginBottom: "10px" }}>
                        Agregar Juego
                    </Button>
                    {
                        games.map((game) => {
                            return (
                                <JuegosLista key={game.id} game={game} />
                            )
                        })
                    }
                </div>
            </Tab>

        </Tabs >
    );
}

export default ModoAdmin;