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

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div data-bs-theme="dark" className="min-vh-100 bg-body text-body">

      <GamesProvider>
        <BibliotecaProvider>
          <CartProvider>

            <BrowserRouter>
              <ToastContainer />

              <NavBar />
              <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login onLogin={() => setLoggedIn(true)} />} />
                <Route path='/register' element={<Register />} />
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