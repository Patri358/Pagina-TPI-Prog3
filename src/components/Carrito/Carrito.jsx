import { CartContext } from "../../context/CartProvider/CartContext";
import { useContext } from "react";

import CardCarrito from "../Cards/CardCarrito/CardCarrito";

const Carrito = () => {

    const { cart, total, handleCompra } = useContext(CartContext);

    return (
        <div>
            <h2 style={{ color: "white" }}>Carrito</h2>
            <div>
                {cart.map((game) => {
                    return (
                        <CardCarrito key={game.id} game={game} />
                    )
                })}

                <h3 style={{ color: "white" }}>Total: ${total}</h3>

                <form onSubmit={handleCompra}>
                    <button style={{ backgroundColor: '#C5A028', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type='submit'>Realizar compra</button>
                </form>
            </div>
        </div>
    )
}

export default Carrito;