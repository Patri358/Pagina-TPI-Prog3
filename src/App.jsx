// hooks
import { useEffect, useState } from 'react';

// routes
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// componentes
import Tienda from './components/Tienda/Tienda.jsx';
import NavBar from './ui/NavBar/NavBar.jsx';
import NewGame from './components/NewGame/NewGame.jsx';
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

  const [loggedIn, setLoggedIn] = useState(false);

  // para que se mantenga la sesión
  useEffect( () => {
    if(localStorage.getItem("token")){
      setLoggedIn(true)
    }
  }, [])

  const handleLogOut = () => {
    setLoggedIn(false)
  }

  const handleLogIn = () => {
    setLoggedIn(true)
  }
 
  return (
<div data-bs-theme="dark" className="min-vh-100 w-100 m-0 p-0 bg-body flex-column" style={{ overflowX: 'hidden' }}>

      <GamesProvider>
        <BibliotecaProvider>
          <CartProvider>

            <BrowserRouter>
              <ToastContainer />

              {loggedIn && <NavBar onLogOut={handleLogOut} />}
              <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login onLogIn={handleLogIn} />} />
                <Route path='/register' element={<Register />} />
                <Route path='/perfil' element={<Perfil />} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path='/carrito' element={<Carrito />} />
                <Route path='/detalle' element={<CardDetalle />} />
                <Route path='/newGame' element={<NewGame />} />
                <Route path='/biblioteca' element={<Biblioteca />} />
              </Routes>
            </BrowserRouter>

          </CartProvider>
        </BibliotecaProvider>
      </GamesProvider>

    </div >
  )
}

export default App;