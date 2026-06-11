// array juegos
import { initialGames } from './data/games.js'

// hooks
import { useState } from 'react';

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

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  // hacer fetch para traer los juegos
  const [games, setGames] = useState(initialGames);
  let ultimoId = games.at(-1).id;

  // para añadir a traves del formulario (no confundir con añadir al cart)
  // hacer el fetch para que el juego se cargue en la base de datos
  const addGame = (newGame) => {
    const completeGame = ({
      ...newGame,
      id: ultimoId + 1
    })
    setGames([completeGame, ...games]);
  }

  const removeGame = (gameId) => {
    setGames(games.filter((game) => game.id !== gameId));
  }


  return (
    <div data-bs-theme="dark" className="min-vh-100 bg-body text-body">

      <BibliotecaProvider>
        <CartProvider>

          <BrowserRouter>
            <ToastContainer />

            <NavBar />
            <Routes>
              <Route path='/' element={<Navigate to="/login" />} />
              <Route path='/login' element={<Login onLogin={() => setLoggedIn(true)} />} />
              <Route path='/register' element={<Register />} />
              <Route path="/tienda" element={<Tienda games={games} onRemoveGame={removeGame}/>} />
              <Route path='/carrito' element={<Carrito />} />
              <Route path='/detalle' element={<CardDetalle />} />
              <Route path='/newGame' element={<NewGame games={games} onAdd={addGame} />} />
              <Route path='/biblioteca' element={<Biblioteca />} />
            </Routes>
          </BrowserRouter>

        </CartProvider>
      </BibliotecaProvider>

    </div >
  )
}

export default App;