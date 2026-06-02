import React from 'react'
import CardBiblioteca from '../Cards/CardBiblioteca/CardBiblioteca'

import { BibliotecaContext } from '../../context/BibliotecaProvider/BibliotecaContext'
import { useContext } from 'react'

const Biblioteca = () => {

  const { myGames } = useContext(BibliotecaContext);

  return (
    <div >
      <h1>Mi Biblioteca</h1>

      {myGames.length === 0 ? (<p>No tenés juegos comprados</p>) : (
        myGames.map((game) => {
          return(
            <CardBiblioteca key={game.id} game={game}/>
          )
        })
        
      )}
    </div>
  )
}

export default Biblioteca;