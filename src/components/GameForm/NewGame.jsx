import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Button, Form, Row, Col } from 'react-bootstrap'

const NewGame = ({ games, onAdd }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    distributor: "",
    poster: "",
    rating: "",
    sinopsis: "",
    tags: [],
    launch: "",
    precio: 0,
  })

  const [error, setError] = useState({})

  const tagsValidas = ["Mundo abierto ", "Multijugador ", "Un jugador ", "Rol ", "Exploracion ", "Aventura ", "Accion ", "Ciencia ficción ", "Metroidvania "]

  const onChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "tags") {
      if (checked) {
        setFormData({
          ...formData,
          tags: [...formData.tags, value],
        });
      } else {
        setFormData({
          ...formData,
          tags: formData.tags.filter(tag => tag !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {

    const errores = {}

    if (!formData.title.trim()) errores.title = "El titulo es obligatorio"
    if (!formData.distributor.trim()) errores.distributor = "El distribuidor es obligatorio"
    if (!formData.poster.trim()) errores.poster = "El poster es obligatorio"
    if (!formData.rating) errores.rating = "El rating es obligatorio"
    if (!formData.sinopsis.trim()) errores.sinopsis = "La sinopsis es obligatoria"
    if (formData.tags.length === 0) errores.tags = "Tenes que seleccionar al menos una etiqueta"
    if (!formData.launch.trim()) errores.launch = "La fecha de lanzamiento es obligatoria"
    if (formData.precio < 0) errores.precio = "El precio es obligatorio"

    const titleFiltered = games.find(m => m.title.toLowerCase() === formData.title.toLowerCase())

    if (titleFiltered) {
      errores.title = "El juego ingresado ya esta en la pagina"
    }

    setError(errores);

    return Object.values(errores).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      const newGame = { id: Date.now(), ...formData }
      onAdd(newGame);
      navigate("/");
    }
  }

  const handleChangeForm = () => {
    console.log("cambio")
  };


  return (
    <div>
      <Form className="p-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control onChange={handleChangeForm} name='title' value={formData.title} placeholder="Ingrese el título..." />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Distribuidor</Form.Label>
              <Form.Control onChange={handleChangeForm} name='distribuidor' value={formData.director} placeholder="Ingrese el distribuidor..." />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Precio</Form.Label>
              <Form.Control onChange={handleChangeForm} name='precio' value={formData.precio} placeholder="Ingrese el precio" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Clasificación</Form.Label>
          <div className="d-flex gap-3">
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Poster</Form.Label>
          <Form.Control onChange={handleChangeForm} name='poster' value={formData.poster} placeholder="Ingrese el poster..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Etiquetas</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {
              tagsValidas.map((tag) => {
                return (
                  <Form.Check onChange={handleChangeForm} name="tags" label={tag} value="tags" />
                )
              })
            }
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sinopsis</Form.Label>
          <Form.Control onChange={handleChangeForm} name='synopsis' value={formData.synopsis} as="textarea" rows={2} placeholder="Ingrese la sinopsis" />
        </Form.Group>

        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Fecha Lanzamiento</Form.Label>
            <Form.Control onChange={handleChangeForm} name='date' value={formData.date} type="date" />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="w-100 mt-2">
          Agregar Juego
        </Button>
        <Button variant="danger" type="button" className="w-100 mt-2">
          Cancelar
        </Button>
      </Form>




      <h1>Cargar un juego nuevo</h1>
      <form onSubmit={handleSubmit}>
        <label>Titulo: </label>
        <input onChange={onChange} type="text" name="title" value={formData.title} placeholder='Ingrese un titulo' />
        {error.title &&
          <p style={{ color: 'red' }}>{error.title}</p>}
        <br />

        <label>Distribuidor: </label>
        <input onChange={onChange} type="text" name="distributor" value={formData.distributor} placeholder='Ingrese un distribuidor' />
        {error.distributor &&
          <p style={{ color: 'red' }}>{error.distributor}</p>}
        <br />

        <label>Poster: </label>
        <input onChange={onChange} type="text" name="poster" value={formData.poster} placeholder='Ingrese un poster' />
        {error.poster &&
          <p style={{ color: 'red' }}>{error.poster}</p>}
        <br />

        <label>Clasificacion: </label>
        <select onChange={onChange} name="rating" value={formData.rating}>
          <option value="elegir">Elija una opcion</option>
          <option value="Apta para todo Publico">Apta para todo Publico</option>
          <option value="Apta para mayores de 10 años">Apta para mayores de 10 años</option>
          <option value="Apta para mayores de 17 años">Apta para mayores de 17 años</option>
        </select>
        {error.rating &&
          <p style={{ color: 'red' }}>{error.rating}</p>}
        <br />

        <label>Sinopsis: </label>
        <input onChange={onChange} type="text" name="sinopsis" value={formData.sinopsis} placeholder='Ingrese una sinopsis' />
        {error.sinopsis &&
          <p style={{ color: 'red' }}>{error.sinopsis}</p>}
        <br />

        <label>Etiquetas: </label>
        {tagsValidas.map((tags) => (
          <div key={tags}>
            <input type='checkbox' name="tags" value={tags} checked={formData.tags.includes(tags)} onChange={onChange} />
            <label>{tags}</label>
          </div>
        ))}

        {error.tags &&
          <p style={{ color: 'red' }}>{error.tags}</p>}
        <br />

        <label>
          Lanzamiento:
        </label>
        <input onChange={onChange} type="date" name="launch" value={formData.launch} placeholder="completar la fecha" />
        {error.launch &&
          <p style={{ color: 'red' }}>{error.launch}</p>}
        <br />

        <label>
          Precio:
        </label>
        <input onChange={onChange} type="number" name="precio" value={formData.precio} placeholder="Ingresar un precio" />
        {error.precio &&
          <p style={{ color: 'red' }}>{error.precio}</p>}
        <br />

        <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          type='submit'>Enviar formulario</button>
        <button style={{ backgroundColor: '#828282', color: 'white', padding: '10px 20px', margin: '10px 5px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          onClick={() => navigate("/")}>Volver</button>
      </form>
    </div>
  )
}

export default NewGame;