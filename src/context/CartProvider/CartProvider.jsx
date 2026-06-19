import { useContext, useState } from "react";
import { CartContext } from "./CartContext.js";
import { BibliotecaContext } from "../../context/BibliotecaProvider/BibliotecaContext";
import { successToast, errorToast } from "../../ui/Toast/Toast.jsx";

export const calcularTotal = (cart) => {
    return cart.reduce((acc, item) => {
        return acc + item.price;
    }, 0)
}

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const handleCart = (game) => {
        if (cart.some(item => item.id === game.id)) {
            errorToast(`${game.title} ya está en el carro`)
        } else {
            setCart((prevCart) => [game, ...prevCart]);
            successToast("Juego agregado al carrito")
        }
    }

    const handleDelete = (game) => {
        setCart(cart.filter((item) => item.id !== game.id))
        successToast(`${game.title} se ha eliminado`)
    }

    const { myGames, setMyGames } = useContext(BibliotecaContext);

    const handleCompra = (event) => {
        event.preventDefault()

        successToast("Compra realizada")

        // array con todos los ids de mi biblioteca
        const idsBiblioteca = myGames.map((juego) => juego.id)

        const juegosSinRepetir = cart.filter((juego) => !idsBiblioteca.includes(juego.id))

        setMyGames([...myGames, ...juegosSinRepetir])
        setCart([])
    }

    const total = calcularTotal(cart)

    return (
        <CartContext.Provider value={{ cart, setCart, handleCart, handleDelete, handleCompra, total }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;