import { useContext, useState, useEffect } from "react"
import { GamesContext } from "./GamesContext.js"
import { successToast } from "../../ui/Toast/Toast.jsx"
import { useNavigate } from "react-router-dom"

const GamesProvider = ({ children }) => {

    // token
    const traerToken = () => {
        return localStorage.getItem("token")
    }

    // generos
    const [generosDescripcion, setGenerosDescripcion] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/generos", {
            headers: {
                "Authorization": `Bearer ${traerToken()}`
            }
        })
            .then(res => res.json())
            .then(data => setGenerosDescripcion(data))
            .catch(err => console.log(err))
    }, [])

    // juegos
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/juegos", {
            headers: {
                "Authorization": `Bearer ${traerToken()}`
            }
        })
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.log(err))
    }, [])

    // actualizo el front y el back
    const handleDelete = (game) => {
        let id = game.id
        fetch(`http://localhost:3001/juegos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${traerToken()}`
            },
        })
            .then((response) => {
                if (response.ok) {
                    // si la respuesta es ok elimina el juego por id
                    setGames((prevGames) => prevGames.filter((g) => g.id !== id));
                    successToast(`Se eliminó ${game.title} de la tienda`)
                } else {
                    errorToast("Sin permisos o token expirado")
                }
            })
            .catch((error) => errorToast(error))
    }

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
                return res.json()
            })
            .then((newGame) => {
                const gameWithGenres = {
                    ...newGame,
                    Generos: newGame.Generos ?? []
                }
                successToast(`Se añadió el juego: ${gameWithGenres.title}`)
                // actualiza el front
                setGames((prevGames) => [...prevGames, gameWithGenres])
            })
            .catch((error) => errorToast(error.message))

    }

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false)
    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleNotEdit = () => {
        setIsEditing(false)
        navigate("/gameForm")
    }

    return (
        <GamesContext.Provider value={{ games, handleAdd, handleDelete, handleEdit, handleNotEdit, isEditing, generosDescripcion, setGenerosDescripcion }}>
            {children}
        </GamesContext.Provider>
    )

}

export default GamesProvider