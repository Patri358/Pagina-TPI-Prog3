import { useContext, useState, useEffect } from "react"
import { GamesContext } from "./GamesContext.js"
import { errorToast, successToast } from "../../ui/Toast/Toast.jsx"
import { useNavigate } from "react-router-dom"

const GamesProvider = ({ children }) => {
    const navigate = useNavigate();

    const traerToken = () => {
        return localStorage.getItem("token")
    }


    const [generosDescripcion, setGenerosDescripcion] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/generos", {
            headers: {
                "Authorization": `Bearer ${traerToken()}`
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
    }, [])

    const [games, setGames] = useState([]);
    
    //Trae los juegos del back
    useEffect(() => {
        fetch("http://localhost:3001/juegos", {
            headers: {
                "Authorization": `Bearer ${traerToken()}`
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
    }, [])

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
        fetch("http://localhost:3001/juegos", {
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
            })
            .catch((error) => errorToast(error.message))
    }


    const [isEditing, setIsEditing] = useState(false)
    
    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleNotEdit = () => {
        setIsEditing(false)
        navigate("/gameForm")
    }

    return (
        <GamesContext.Provider value={{ 
            games, 
            handleAdd, 
            handleDelete, 
            handleEdit, 
            handleNotEdit, 
            isEditing, 
            generosDescripcion, 
            setGenerosDescripcion 
        }}>
            {children}
        </GamesContext.Provider>
    )
}

export default GamesProvider;