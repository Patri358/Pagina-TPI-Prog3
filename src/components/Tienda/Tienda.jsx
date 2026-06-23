import { useState, useContext } from 'react'
import CardGame from "../Cards/CardTienda/CardTienda.jsx"
import GameDetail from '../GameDetail/GameDetail.jsx'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { GamesContext } from '../../context/GamesProvider/GamesContext.js'

const Tienda = ({ tienePermiso }) => {

    const { games } = useContext(GamesContext)

    return (
        <div className="d-flex flex-column align-items-center">
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