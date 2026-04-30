import React from 'react'
import { initialGames } from '../../data/games.js'
import { useState } from 'react'
import GameDetail from "../GameDetail/GameDetail.jsx"
import GameCard from "../GameCard/GameCard.jsx"


const Tienda = ({ games, setGames, setBiblioteca }) => {

    const [modalAbiertoDetalles, setModalAbiertoDetalles] = useState(false)
    const [modalAbiertoEliminar, setModalAbiertoEliminar] = useState(false)
    const [gameSel, setGameSel] = useState(null)
    const [gameSelEliminar, setGameSelEliminar] = useState(null)

    // Modal de detalles del juego

    const abrirModalDetalles = (game) => {
        setGameSel(game)
        setModalAbiertoDetalles(true)
    }

    const cerrarModalDetalles = () => {
        setModalAbiertoDetalles(false)
        setGameSel(null)
    }

    //Modal para eliminar un juego
    const abrirModalEliminar = (game) => {
        setGameSelEliminar(game)
        setModalAbiertoEliminar(true)
    }

    const cerrarModalEliminar = () => {
        setModalAbiertoEliminar(false)
        setGameSelEliminar(null)
    }

    const confirmarEliminar = (id) => {
        setGames(games.filter(game => game.id !== id))
        cerrarModalEliminar()
    }

    // Agregar al carrito
    const [carrito, setCarrito] = useState([])
    const [valor, setValor] = useState("");

    const addCarrito = (game) => {
        setCarrito([...carrito, game])
    }

    const eliminarProducto = (id) => {
        const nuevoCarrito = carrito.filter(
            (game) => game.id !== id
        );

        setCarrito(nuevoCarrito);
        setValor("Eliminado");
    }

    const handleCompra = (e) => {
        e.preventDefault();
        setBiblioteca(prev => [...prev, ...carrito])
        setValor("CompraHecha");
        setCarrito([]);
    };

    const handleAgregar = (game) => {
        addCarrito(game)
        setValor("Agregado")
    }

    const totalPrice = carrito.reduce((counter, game) => {
        return counter + game.price
    }, 0)

    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                {games.map((game) => (
                    <GameCard key={game.id} id={game.id} game={game} />
                ))}
            </div>

            {modalAbiertoDetalles && <GameDetail game={gameSel} cerrarModalDetalles={cerrarModalDetalles} />}
            {modalAbiertoEliminar &&
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        minWidth: '300px'
                    }}>
                        <h3>¿Eliminar {gameSelEliminar?.title}?</h3>
                        <button style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            onClick={() => confirmarEliminar(gameSelEliminar.id)}
                        >Eliminar</button>
                        <button style={{ backgroundColor: '#ccc', color: '#333', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            onClick={cerrarModalEliminar}>
                            Cancelar
                        </button>
                    </div>
                </div>
            }
            <h2>Carrito</h2>
            <ul>
                {carrito.map((game, index) => (
                    <li key={index}> <br /> {game.title} <br /> <img src={game.poster} alt={game.title} style={{ width: '200px', height: '300px', objectFit: 'cover' }} /> <br /> ${game.price} <br />
                        <button style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => eliminarProducto(game.id)}>
                            Eliminar producto
                        </button>
                    </li>
                ))}
                <h3>Precio total: ${totalPrice}</h3>
                <form onSubmit={handleCompra}>
                    <button style={{ backgroundColor: '#C5A028', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type='submit'>Realizar compra</button>
                </form>
            </ul>
            {valor === "Agregado" ? (
                <p style={{ color: 'white' }}>Juego agregado al carrito</p>
            ) : valor === "Eliminado" ? (
                <p style={{ color: 'red' }} >Juego eliminado del carrito</p>
            ) : valor === "CompraHecha" ? (
                <p style={{ color: 'gold' }}>Compra Realizada</p>
            ) : (
                <p></p>
            )}
        </div>
    )
}

export default Tienda;