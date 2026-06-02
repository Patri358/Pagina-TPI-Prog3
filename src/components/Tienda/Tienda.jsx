import React from 'react'
import CardGame from "../Cards/CardTienda/CardTienda.jsx"

const Tienda = ({ games }) => {

    return (
        <div className="d-flex flex-column align-items-center">
            {games.map((game) => (
                <CardGame key={game.id} game={game} />
            ))}
        </div>
    )
}

export default Tienda;