import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { Button, Form, Row, Col } from 'react-bootstrap'
import { errorToast } from '../../ui/Toast/Toast'

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
    price: "",
  })

  const [error, setError] = useState({})

  const tagsValidas = ["Mundo abierto ", "Multijugador ", "Un jugador ", "Rol ", "Exploracion ", "Aventura ", "Accion ", "Ciencia ficción ", "Metroidvania "]
  const ratings = ["Apto para todo público", "Apto para mayores de 10", "Apto para mayores de 18"]

  const validate = () => {

    const errores = [
      { error: !formData.title.trim(), mensaje: "El título es obligatorio" },
      { error: !formData.distributor.trim(), mensaje: "El distribuidor es obligatorio" },
      { error: !formData.poster.trim(), mensaje: "El poster es obligatorio" },
      { error: !formData.rating, mensaje: "La clasificación es obligatoria" },
      { error: !formData.sinopsis, mensaje: "La sinopsis es obligatoria" },
      { error: !formData.tags.length, mensaje: "Tenes que seleccionar al menos una etiqueta" },
      { error: !formData.launch.trim(), mensaje: "La fecha de lanzamiento es obligatoria" },
      { error: formData.price < 0, mensaje: "El precio es obligatorio" }
    ].find(error => error.error)

    if (errores) {
      errorToast(errores.mensaje)
      return
    }

    const EnTienda = games.some((juego) => juego.title.toLowerCase() === formData.title.toLowerCase())
    if (EnTienda) {
      let errorTitulo = "El juego ingresado ya está en la pagina"
      errorToast(errorTitulo)
      return
    }

    return true;
  }

  const handleChangeForm = (event) => {
    const { name, value, checked } = event.target;

    if (name === "tags") {
      checked ? (
        setFormData({
          ...formData,
          tags: [...formData.tags, value],
        })
      ) : (
        setFormData({
          ...formData,
          tags: formData.tags.filter(tag => tag !== value),
        })
      )
    }

    else if (name === "price") {
      setFormData({
        ...formData,
        // isNaN es para que si escribe una letra no tire el error NaN y lo reemplaza por 0
        [name]: isNaN(value) ? 0 : parseFloat(value)
      })
    }

    else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validate()) {
      const newGame = formData
      onAdd(newGame);
      navigate("/Tienda");
    }
  }

  const handleCancel = () => {
    navigate("/Tienda")
  }

  return (
    <Form className="p-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control onChange={handleChangeForm} name='title' value={formData.title} placeholder="Ingrese el título..." />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Distribuidor</Form.Label>
            <Form.Control onChange={handleChangeForm} name='distributor' value={formData.distributor} placeholder="Ingrese el distribuidor..." />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" onChange={handleChangeForm} name='price' value={formData.price} placeholder="Ingrese el precio" />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Clasificación</Form.Label>
        <div className="d-flex gap-3">
          {
            ratings.map((rating) => {
              return (
                <Form.Check onChange={handleChangeForm} key={rating} name="rating" label={rating} value={rating} type='radio' />
              )
            })
          }
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
                <Form.Check onChange={handleChangeForm} key={tag} name="tags" label={tag} value={tag} />
              )
            })
          }
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Sinopsis</Form.Label>
        <Form.Control onChange={handleChangeForm} name='sinopsis' value={formData.sinopsis} as="textarea" rows={2} placeholder="Ingrese la sinopsis" />
      </Form.Group>

      <Row>
        <Form.Group className="mb-3">
          <Form.Label>Fecha Lanzamiento</Form.Label>
          <Form.Control onChange={handleChangeForm} name='launch' value={formData.launch} type="date" />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" className="w-100 mt-2">
        Agregar Juego
      </Button>
      <Button onClick={handleCancel} variant="danger" type="button" className="w-100 mt-2">
        Cancelar
      </Button>
    </Form>
  )
};

export default NewGame;