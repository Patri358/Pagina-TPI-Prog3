// hooks
import { useEffect, useState } from 'react';

// routes
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Protected from './routing/Protected/Protected.jsx';

// componentes
import Tienda from './components/Tienda/Tienda.jsx';
import NavBar from './ui/NavBar/NavBar.jsx';
import GameForm from './components/Admin/gameForm/GameForm.jsx';
import Biblioteca from './components/Biblioteca/Biblioteca.jsx';
import Carrito from "./components/Carrito/Carrito.jsx";
import Login from "./auth/login/Login.jsx"
import Register from "./auth/register/Register.jsx"
import CardDetalle from './components/Cards/CardDetalle/CardDetalle.jsx';
import Perfil from './components/Perfil/Perfil.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import ModoAdmin from './components/Admin/ModoAdmin/ModoAdmin.jsx';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// providers
import CartProvider from './context/CartProvider/CartProvider.jsx';
import BibliotecaProvider from './context/BibliotecaProvider/BibliotecaProvider.jsx';
import GamesProvider from './context/GamesProvider/GamesProvider.jsx';

const App = () => {

  const [user, setUser] = useState(() => {
    const usuarioGuardado = localStorage.getItem("user")
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  })

  // trae el token del localStorage
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("token") ? true : false
  });

  const handleLogOut = () => {
    // elimina el localStorage y setea los estados en null
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setLoggedIn(false)
    setUser(null)
  }

  const handleLogIn = (data) => {
    setUser(data)
    setLoggedIn(true)
  }

  const esAdmin = user?.rol === "admin" || user?.rol === "superAdmin"
  const esSuperAdmin = user?.rol === "superAdmin"

  return (
    <div data-bs-theme="dark" className="min-vh-100 w-100 m-0 p-0 bg-body flex-column" style={{ overflowX: 'hidden' }}>
      <BrowserRouter>

        <BibliotecaProvider>
          <CartProvider>
            <GamesProvider>

              <ToastContainer />
              {loggedIn && <NavBar onLogOut={handleLogOut} tienePermiso={esAdmin} />}

              <Routes>
                <Route path='/' element={loggedIn ? <Navigate to="/tienda" replace /> : <Navigate to="/login" replace />} />
                <Route path='/login' element={loggedIn ? <Navigate to="/tienda" replace /> : <Login onLogIn={handleLogIn} />} />
                <Route path='/register' element={loggedIn ? <Navigate to="/tienda" replace /> : <Register />} />
                <Route path='/perfil' element={<Protected isLogged={loggedIn}> <Perfil perfil={user} /> </Protected>} />
                <Route path="/tienda" element={<Protected isLogged={loggedIn} > <Tienda tienePermiso={esAdmin} /> </Protected>} />
                <Route path='/carrito' element={<Protected isLogged={loggedIn}> <Carrito /> </Protected>} />
                <Route path='/detalle' element={<Protected isLogged={loggedIn}> <CardDetalle /> </Protected>} />
                <Route path='/biblioteca' element={<Protected isLogged={loggedIn}> <Biblioteca /> </Protected>} />
                <Route path='/gameForm' element={<Protected isLogged={loggedIn && esAdmin}>  <GameForm /> </Protected>} />
                <Route path='/modoAdmin' element={<Protected isLogged={loggedIn && esAdmin}>  <ModoAdmin esSuperAdmin={esSuperAdmin} /> </Protected>} />
                <Route path='*' element={<NotFound isLog={loggedIn} />} />
              </Routes>

            </GamesProvider>
          </CartProvider>
        </BibliotecaProvider>

      </BrowserRouter>

    </div >
  )
}

export default App;