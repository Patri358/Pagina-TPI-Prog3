import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tienda from "./components/Tienda/Tienda.jsx";
import NavBar from "./ui/NavBar.jsx";
import NewGame from "./components/GameForm/NewGame.jsx";
import { initialGames } from "./data/games.js";
import Biblioteca from "./components/Biblioteca/Biblioteca.jsx";
import Login from "./auth/login/Login.jsx";
import Register from "./auth/register/Register.jsx";

const App = () => {
  const [games, setGames] = useState(initialGames);
  const [biblioteca, setBiblioteca] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const addGame = (newGame) => {
    setGames([...games, newGame]);
  };

  return (
    <div data-bs-theme="dark" className="min-vh-100 bg-body text-body">
      <BrowserRouter>
        {loggedIn && <NavBar />}
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Tienda games={games} setGames={setGames} setBiblioteca={setBiblioteca} />
              ) : (
                <Login onLogin={handleLogIn} />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogIn} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/new-game"
            element={loggedIn ? <NewGame games={games} onAdd={addGame} /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/biblioteca"
            element={loggedIn ? <Biblioteca biblioteca={biblioteca} /> : <Navigate replace to="/login" />}
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;