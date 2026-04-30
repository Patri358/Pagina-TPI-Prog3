import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tienda from './components/Tienda/Tienda.jsx'
import NavBar from './ui/NavBar.jsx'
import NewGame from './components/GameForm/NewGame.jsx'
import { initialGames } from './data/games.js'
import Biblioteca from './components/Biblioteca/Biblioteca.jsx'

const App = () => {

  const [games, setGames] = useState(initialGames)
  const [biblioteca, setBiblioteca] = useState([])

  const addGame = (newGame) => {
    setGames([...games, newGame]);
  }

  return (
    <div data-bs-theme="dark" className="min-vh-100 bg-body text-body">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Tienda games={games} setGames={setGames} setBiblioteca={setBiblioteca} />} />
          <Route path='/new-game' element={<NewGame games={games} onAdd={addGame} />} />
          <Route path='/biblioteca' element={<Biblioteca biblioteca={biblioteca} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;