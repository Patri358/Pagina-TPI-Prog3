import React from 'react'
import CardBiblioteca from '../Cards/CardBiblioteca/CardBiblioteca'

import { BibliotecaContext } from '../../context/BibliotecaProvider/BibliotecaContext'
import { useContext } from 'react'
import { Container } from 'react-bootstrap' // Importamos el Container

const Biblioteca = () => {

  const { myGames } = useContext(BibliotecaContext);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="text-white">Mi Biblioteca</h1>

      {myGames.length === 0 ? (
        <p className="text-white">No tenés juegos comprados</p>
      ) : (
        myGames.map((game) => {
          return (
            <CardBiblioteca key={game.id} game={game} />
          )
        })
      )}
    </Container>
  )
}

export default Biblioteca;