import { useState, useContext } from 'react'
import CardGame from "../Cards/CardTienda/CardTienda.jsx"
import GameDetail from '../GameDetail/GameDetail.jsx'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { GamesContext } from '../../context/GamesProvider/GamesContext.js'
import ModalDelete from '../../ui/ModalDelete/ModalDelete.jsx'
import useModal from '../../services/useModal/useModal.js'

const Tienda = () => {

    const { games } = useContext(GamesContext)

    const { handleAbrir, handleCerrar, estadoModal } = useModal()

    return (
        <div className="d-flex flex-column align-items-center">
            {games.map((game) => (
                <div>
                    {estadoModal && <ModalDelete game={game} cerrarModal ={handleCerrar}></ModalDelete>}
                    <CardGame
                        key={game.id}
                        game={game}
                        abrirModal={handleAbrir}
                    />
                </div>


            ))}

        </div>
    )
}

export default Tienda;