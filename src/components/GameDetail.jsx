import React from 'react'

const GameDetail = ({ game, cerrarModalDetalles }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        color: 'black',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h2>{game.title}</h2>
        <img src={game.poster} alt={game.title} style={{width: '100%', borderRadius: '5px', marginBottom: '15px'}} />
        <p><strong>Distribuidor:</strong> {game.distributor}</p>
        <p><strong>Clasificación:</strong> {game.rating}</p>
        <p><strong>Sinopsis:</strong> {game.synopsis}</p>
        <p><strong>Etiquetas:</strong> {game.tags.join(', ')}</p>
        <p><strong>Lanzamiento:</strong> {game.launch}</p>
        
        <button style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '10px 20px',
          marginTop: '20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%'
        }} onClick={cerrarModalDetalles}>
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default GameDetail
