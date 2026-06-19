import { useContext, useState, useEffect } from "react"
import { GamesContext } from "./GamesContext.js"

const GamesProvider = ({ children }) => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/juegos")
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(error => console.log(error))
    }, [])
    const ultimoID = games.at(-1)?.id

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
                    successToast(`Se eliminó ${game.title} de la tienda`)
                } else {
                    errorToast("Error al eliminar el juego")
                }
            })
            .catch((error) => errorToast(error))

        setGames(games.filter((g) => g.id !== game.id));
    }

    const handleAdd = (newGame) => {

        const completeGame = {
            ...newGame,
            ultimoID
        }

        fetch("http://localhost:3001/juegos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(completeGame),
        })
            .then()
            .then()
            .catch((error) => errorToast(error.message))

        setGames((prevGames) => [...prevGames, completeGame])
    }


    return (
        <GamesContext.Provider value={{ games, handleAdd }}>
            {children}
        </GamesContext.Provider>
    )

}

export default GamesProvider