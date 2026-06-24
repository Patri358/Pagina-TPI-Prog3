import { Generos } from "../models/Generos.js";

export const findGeneros = async (req, res) => {
    try {
        const generos = await Generos.findAll()
        res.json(generos);

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error del servidor al traer los géneros" })
    }
}

export const createGenero = async (req, res) => {
    try {
        const { descripcion } = req.body

        // verifica si está vacio
        if (!descripcion) {
            return res.status(400).json({ mensaje: "La descripcion es obligatoria" })
        }

        // creo el nuevo género
        const nuevoGenero = await Generos.create({ descripcion })

        // devuelvo el género
        return res.status(201).json({ nuevoGenero })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error del servidor al crear un género" })
    }
}

export const actualizarGenero = async (req, res) => {
    const { id } = req.params;
    res.send(`Género con el id ${id} actualizado`)
}

export const borrarGenero = async (req, res) => {
    const { id } = req.params;
    res.send(`Género con el id ${id} eliminado`)
}
