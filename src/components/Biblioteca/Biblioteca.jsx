import React from 'react'
import GameCard from '../GameCard/GameCard'

const Biblioteca = ({ games, setGames, biblioteca }) => {
  return (
    <div >
      <h1>Mi Biblioteca</h1>

      {biblioteca.length === 0 ? (
        <p>No tenés juegos comprados</p>
      ) : (
        <ul>
          {biblioteca.map((game, index) => (
            <li key={index}>
              <h4>{game.title} </h4><img src={game.poster} alt={game.title} style={{ width: '200px', height: '300px', objectFit: 'cover' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Biblioteca

/*
importar gameCard para mostrar los juegos en biblioteca
*/