import React, { useState } from 'react'
import CardGame from "../Cards/CardTienda/CardTienda.jsx"
import GameDetail from '../GameDetail/GameDetail.jsx'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



const Tienda = ({ games, onRemoveGame }) => {

    const [gameDetail, setGameDetail] = useState(null)
    const [gameToDelete, setGameToDelete] = useState(null)

    const openDetails = (game) => setGameDetail(game)
    const closeDetails = () => setGameDetail(null)

    const openDelete = (game) => setGameToDelete(game)
    const closeDelete = () => setGameToDelete(null)

    const confirmDelete = () => {
        if(gameToDelete && onRemoveGame){
            onRemoveGame(gameToDelete.id)
        }
        closeDelete()
    }

    return (
        <>
        <div className="d-flex flex-column align-items-center">
            {games.map((game) => (
                <CardGame 
                    key={game.id} 
                    game={game} 
                    onDetails={openDetails}
                    onDelete={openDelete}
                />
            ))}
        </div>

        {gameDetail && (
            <GameDetail
                game={gameDetail}
                closeModalDetail={closeDetails} 
                />
        )}

        <Modal show={!!gameToDelete} onHide={closeDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar juego</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {gameToDelete ? (
                    <p>
                        ¿Estas seguro que deseas eliminar{gameToDelete.title} de la tienda?
                    </p>
                ) : (
                    <p>Cargando...</p>
                )
            }
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeDelete}> Cancelar </Button>
                <Button variant='danger' onClick={confirmDelete}> Eliminar </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}


export default Tienda;