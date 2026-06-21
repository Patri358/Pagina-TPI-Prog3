import { CartContext } from "../../context/CartProvider/CartContext";
import { useContext, useState } from "react";
import GameDetail from "../GameDetail/GameDetail";
import CardCarrito from "../Cards/CardCarrito/CardCarrito";
import { Container } from "react-bootstrap";

const Carrito = () => {

    const { cart, total, handleCompra } = useContext(CartContext);
    const [gameDetail, setGameDetail] = useState(null)

    const openDetails = (game) => setGameDetail(game)
    const closeDetails = (game) => setGameDetail(null)

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h2 style={{ color: "white" }}>Carrito</h2>
            <div>
                {cart.map((game) => {
                    return (
                        <CardCarrito key={game.id} game={game} onDetails={openDetails} />
                    )
                })}

                <h3 style={{ color: "white" }}>Total: ${total}</h3>

                <form onSubmit={handleCompra}>
                    <button style={{ backgroundColor: '#C5A028', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type='submit'>Realizar compra</button>
                </form>
                {gameDetail && (
                    <GameDetail
                        game={gameDetail}
                        closeModalDetail={closeDetails} />
                )

                }


            </div>
        </Container>
    )
}

export default Carrito;