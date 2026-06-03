import React from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartProvider/CartContext';
import { useContext } from 'react';

const NavBar = () => {

  // para mostrar la cantidad de items en el cart del navbar
  const cart = useContext(CartContext).cart

  return (
    <nav className="d-flex align-items-center" style={{ padding: '20px', backgroundColor: '#333' }}>

      <div style={{ flex: 1 }}></div>

      <div className="d-flex gap-4" style={{ flex: 2, justifyContent: "center" }}>
        <Link to="/" style={{ color: 'white', textDecoration: "none", fontSize: "1.1rem" }}> <i className="bi bi-cart3"></i> Tienda </Link>
        <Link to="/newGame" style={{ color: 'white', textDecoration: "none", fontSize: "1.1rem" }}> <i className="bi bi-plus-circle"></i> Agregar Juego</Link>
        <Link to="/biblioteca" style={{ color: 'white', textDecoration: "none", fontSize: "1.1rem" }}> <i className="bi bi-collection"></i> Biblioteca </Link>
      </div>

      <div style={{ flex: 1, textAlign: "right" }}>
        <Link to="/carrito" style={{ color: 'white', textDecoration: 'none', fontSize: "1.1rem" }} className="position-relative">
          <i className="bi bi-cart3 me-1"></i> Carrito
          {cart.length > 0 && (
            <span className="badge rounded-pill bg-danger ms-2" style={{ fontSize: '0.8rem', position: "absolute", right: "-20px", top: "-11px" }}>
              {cart.length}
            </span>
          )}
        </Link>
      </div>

    </nav>
  )
}

export default NavBar;