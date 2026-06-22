// hooks
import { useEffect, useState } from 'react';

// routes
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// componentes
import Tienda from './components/Tienda/Tienda.jsx';
import NavBar from './ui/NavBar/NavBar.jsx';
import GameForm from './components/GameForm/GameForm.jsx';
import Biblioteca from './components/Biblioteca/Biblioteca.jsx';
import Carrito from "./components/Carrito/Carrito.jsx";
import Login from "./auth/login/Login.jsx"
import Register from "./auth/register/Register.jsx"
import CardDetalle from './components/Cards/CardDetalle/CardDetalle.jsx';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// providers
import CartProvider from './context/CartProvider/CartProvider.jsx';
import BibliotecaProvider from './context/BibliotecaProvider/BibliotecaProvider.jsx';
import GamesProvider from './context/GamesProvider/GamesProvider.jsx';


import Perfil from './components/Perfil/Perfil.jsx';

const App = () => {

  const [user, setUser] = useState({})

  const [loggedIn, setLoggedIn] = useState(false);

  // para que se mantenga la sesión
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user") || "{}"
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
      setUser(JSON.parse(usuarioGuardado))
    }
  }, [])

  const handleLogOut = () => {
    setUser({})
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setLoggedIn(false)
  }

  const handleLogIn = (data) => {
    setUser(data)
    setLoggedIn(true)
  }

  return (
    <div data-bs-theme="dark" className="min-vh-100 w-100 m-0 p-0 bg-body flex-column" style={{ overflowX: 'hidden' }}>
      <BrowserRouter>

        <BibliotecaProvider>
          <CartProvider>
            <GamesProvider>

              <ToastContainer />
              {loggedIn && <NavBar onLogOut={handleLogOut} />}

              <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login onLogIn={handleLogIn} />} />
                <Route path='/register' element={<Register />} />
                <Route path='/perfil' element={<Perfil perfil={user} />} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path='/carrito' element={<Carrito />} />
                <Route path='/detalle' element={<CardDetalle />} />
                <Route path='/gameForm' element={<GameForm />} />
                <Route path='/biblioteca' element={<Biblioteca />} />
                <Route path='*' element={<Navigate to="/login" />} />
              </Routes>

            </GamesProvider>
          </CartProvider>
        </BibliotecaProvider>

      </BrowserRouter>

    </div >
  )
}

export default App;