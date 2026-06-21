import { useContext, useState, useEffect } from "react"
import { GamesContext } from "./GamesContext.js"
import { successToast } from "../../ui/Toast/Toast.jsx"

const GamesProvider = ({ children }) => {

    // generos
    const [generosDescripcion, setGenerosDescripcion] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/generos")
            .then(res => res.json())
            .then(data => setGenerosDescripcion(data))
            .catch(err => console.log(err))
    }, [])

    // juegos
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/juegos")
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(error => console.log(error))
    }, [])

    // actualizo el front y el back
    const handleDelete = (game) => {
        let id = game.id
        fetch(`http://localhost:3001/juegos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                if (response.ok) {
                    setGames((prevGames) => prevGames.filter((g) => g.id !== id));
                    successToast(`Se eliminó ${game.title} de la tienda`)
                } else {
                    errorToast("Error al eliminar el juego")
                }
            })
            .catch((error) => errorToast(error))
    }

    const handleAdd = (newGame) => {
        fetch("http://localhost:3001/juegos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGame),
        })
            .then((res) => {
                return res.json()
            })
            .then((newGame) => {
                successToast(`Se añadió el juego: ${newGame.title}`)
                setGames((prevGames) => [...prevGames, newGame])
            })
            .catch((error) => errorToast(error.message))

    }

    const [isEditing, setIsEditing] = useState(false)
    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleNotEdit = () => {
        setIsEditing(false)
    }

    return (
        <GamesContext.Provider value={{ games, handleAdd, handleEdit, handleNotEdit, isEditing, generosDescripcion }}>
            {children}
        </GamesContext.Provider>
    )

}

export default GamesProvider