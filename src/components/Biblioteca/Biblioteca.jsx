import React from 'react'
import CardBiblioteca from '../Cards/CardBiblioteca/CardBiblioteca'

import { BibliotecaContext } from '../../context/BibliotecaProvider/BibliotecaContext'
import { useContext } from 'react'
import { Container } from 'react-bootstrap' // Importamos el Container

const Biblioteca = () => {

  const { myGames } = useContext(BibliotecaContext);

  return (
    <Container className="text-center">
      <h1 className="text-white">Mi Biblioteca</h1>

      {myGames.length === 0 ? (
        <p className="text-white">No tenés juegos comprados</p>
      ) : (
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-stretch">
          {myGames.map((game) => {
            return (
              <CardBiblioteca key={game.id} game={game} />
            )
          })}
        </div>
      )}
    </Container>
  )
}

export default Biblioteca;