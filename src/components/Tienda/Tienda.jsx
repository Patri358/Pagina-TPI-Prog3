import { useState, useContext } from 'react'
import CardGame from "../Cards/CardTienda/CardTienda.jsx"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { GamesContext } from '../../context/GamesProvider/GamesContext.js'

const Tienda = ({ tienePermiso }) => {

    const { games } = useContext(GamesContext)

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '30px', width: '100%', padding: '30px' }}>
            {games.map((game) => (
                <CardGame
                    key={game.id}
                    game={game}
                    tienePermiso={tienePermiso}
                />
            ))}
        </div>
    )
}

export default Tienda;