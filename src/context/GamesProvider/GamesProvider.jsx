import { useContext, useState, useEffect } from "react"
import { GamesContext } from "./GamesContext.js"
import { errorToast, successToast } from "../../ui/Toast/Toast.jsx"
import { useNavigate } from "react-router-dom"

const GamesProvider = ({ children, loggedIn }) => {
    const navigate = useNavigate();

    const traerToken = () => {
        return localStorage.getItem("token")
    }

    const [generosDescripcion, setGenerosDescripcion] = useState([])

    useEffect(() => {

        if (!loggedIn) {
            return;
        }

        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            return;
        }

        fetch("http://localhost:3001/generos", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error del servidor: ${res.status}`);
                }
                return res.json()
            })
            .then(data => setGenerosDescripcion(data))
            .catch(err => errorToast(`Error al traer géneros: ${err.message}`))
        // solo si está logueado
    }, [loggedIn])

    const [games, setGames] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);

    //Trae los juegos del back
    useEffect(() => {
        const token = traerToken();

        if (!token || token === "null" || token === "undefined") {
            setGames([])
            return;
        }

        fetch("http://localhost:3001/juegos", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error del servidor: ${res.status}`);
                }
                return res.json()
            })
            .then(data => setGames(data))
            .catch(err => console.error("Error al traer juegos: ", err))
    }, [loggedIn])

    // eliminar un juego
    const handleDelete = (game) => {
        const id = game.id
        fetch(`http://localhost:3001/juegos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${traerToken()}`
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status === 403 || res.status === 401
                        ? "Sin permisos o sesión expirada"
                        : `Error del servidor: ${res.status}`
                    );
                }
                // si la respuesta es ok elimina el juego del front
                setGames((prevGames) => prevGames.filter((g) => g.id !== id));
                successToast(`Se eliminó ${game.title} de la tienda`)
            })
            .catch((error) => errorToast(error.message))
    }

    // agregar un juego
    const handleAdd = (newGame) => {
        return fetch("http://localhost:3001/juegos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${traerToken()}`
            },
            body: JSON.stringify(newGame),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error al añadir: ${res.status}`);
                }
                return res.json()
            })
            .then((newGameData) => {
                const gameWithGenres = {
                    ...newGameData,
                    Generos: newGameData.Generos ?? []
                }
                successToast(`Se añadió el juego: ${gameWithGenres.title}`)
                setGames((prevGames) => [...prevGames, gameWithGenres])
                return gameWithGenres;
            })
            .catch((error) => {
                errorToast(error.message)
                throw error
            })
    }

    const handleUpdate = (updatedGame) => {
        const id = updatedGame.id || selectedGame?.id;
        if (!id) {
            errorToast("No se pudo identificar el juego a editar");
            return Promise.reject(new Error("No se pudo identificar el juego a editar"));
        }

        return fetch(`http://localhost:3001/juegos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${traerToken()}`
            },
            body: JSON.stringify(updatedGame),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status === 403 || res.status === 401
                        ? "Sin permisos o sesión expirada"
                        : `Error del servidor: ${res.status}`
                    );
                }
                return res.json()
            })
            .then((updatedGameData) => {
                const gameWithGenres = {
                    ...updatedGameData,
                    Generos: updatedGameData.Generos ?? []
                }
                setGames((prevGames) => prevGames.map((game) => game.id === gameWithGenres.id ? gameWithGenres : game))
                setIsEditing(false)
                setSelectedGame(null)
                successToast(`Se actualizó el juego: ${gameWithGenres.title}`)
                return gameWithGenres;
            })
            .catch((error) => {
                errorToast(error.message)
                throw error
            })
    }

    const handleEdit = (game) => {
        setSelectedGame(game)
        setIsEditing(true)
    }

    const resetEditing = () => {
        setIsEditing(false)
        setSelectedGame(null)
    }

    const handleNotEdit = () => {
        resetEditing()
        navigate("/gameForm")
    }

    return (
        <GamesContext.Provider value={{
            games,
            handleAdd,
            handleDelete,
            handleEdit,
            handleUpdate,
            handleNotEdit,
            isEditing,
            selectedGame,
            resetEditing,
            generosDescripcion,
            setGenerosDescripcion
        }}>
            {children}
        </GamesContext.Provider>
    )
}

export default GamesProvider;