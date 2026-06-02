import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='d-flex justify-content-center' style={{ padding: '20px', backgroundColor: '#333' }}>
      <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Tienda</Link>
      <Link to="/new-game" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Agregar Juego</Link>
      <Link to="/biblioteca" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Biblioteca</Link>
      <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Cerrar sesion</Link>
    </nav>
  )
}

export default NavBar;
