import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserCard from '../userCard/userCard';
import { useContext, useState, useEffect } from 'react';
import { GamesContext } from '../../context/GamesProvider/GamesContext';
import { errorToast, successToast } from '../../ui/Toast/Toast';

const ModoAdmin = ({ esSuperAdmin }) => {

    const [users, setUsers] = useState([])

    // trae todos los usuarios
    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err))
    }, [])

    const { generosDescripcion, games } = useContext(GamesContext)

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

    return (
        <Tabs
            defaultActiveKey="users"
            id="ventanas-admin"
            className="mb-3"
            fill
        >
            <Tab eventKey="users" title="Usuarios">
                <div className='p-3'>
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
                {
                    generosDescripcion.map((genero) => {
                        return (
                            <div key={genero.id}>
                                <h2 style={{ color: "white" }}>{genero.descripcion}</h2>
                            </div>
                        )
                    })
                }
            </Tab>

            <Tab eventKey="juegos" title="Juegos">
                {
                    games.map((game) => {
                        return (
                            <div key={game.id}>
                                <h2 style={{ color: "white" }}>{game.title}</h2>
                            </div>
                        )
                    })
                }
            </Tab>
        </Tabs>
    );
}

export default ModoAdmin;