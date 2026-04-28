import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Principal from './components/Principal'
import NavBar from './components/NavBar'
import NewGame from './components/NewGame'
import { initialGames } from './components/games.js'
import Biblioteca from './components/Biblioteca.jsx'

function App() {

  const[games, setGames] = useState(initialGames)
  const [biblioteca, setBiblioteca] = useState([])

  const addGame = (newGame) => {
    setGames([...games, newGame]);
  }
  
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Principal games={games} setGames={setGames} setBiblioteca={setBiblioteca} />} />
        <Route path='/new-game' element={<NewGame games={games} onAdd={addGame}/>} />
        <Route path='/biblioteca' element={<Biblioteca biblioteca={biblioteca}/>}
/>
      </Routes>   
    </BrowserRouter>
  )
}

export default App
