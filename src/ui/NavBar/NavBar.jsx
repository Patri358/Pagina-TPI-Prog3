import React from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartProvider/CartContext';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import "./NavBar.css"

const NavBar = () => {
  // Para mostrar la cantidad de juegos en el carro
  const cart = useContext(CartContext).cart

  return (
    <nav className="d-flex align-items-center navbar-container">

      <div className="navbar-spacer"></div>

      <div className="d-flex gap-4 navbar-links-center">
        <Link to="/tienda" className="navbar-link">
          <i className="bi bi-cart3"></i> Tienda
        </Link>
        <Link to="/newGame" className="navbar-link">
          <i className="bi bi-plus-circle"></i> Agregar Juego
        </Link>
        <Link to="/biblioteca" className="navbar-link">
          <i className="bi bi-collection"></i> Biblioteca
        </Link>

        <Link to="/carrito" className="position-relative navbar-link">
          <i className="bi bi-cart3 me-1"></i> Carrito
          {cart.length > 0 && (
            <span className="badge rounded-pill bg-danger ms-2 navbar-cart-badge">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      <div className="navbar-actions-right">
        <Link to="*" className="navbar-link">
          <i className="bi bi-person-gear navbar-admin-icon"> Modo admin</i>
        </Link>
        <Link to="*" className="navbar-link">
          <i className="bi bi-person"> Perfil</i>
        </Link>
        <Button variant="danger" className="navbar-btn-logout">Cerrar sesión</Button>
      </div>

    </nav>
  )
}

export default NavBar;