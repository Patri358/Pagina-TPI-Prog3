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
    try {

        const { id } = req.params;
        const { descripcion } = req.body;

        // verifica si hay descripcion
        if (!descripcion || descripcion.trim().length === 0) {
            return res.status(400).json({ mensaje: "La descripcion es obligatoria" })
        }

        // busca por id
        const genero = await Generos.findByPk(id)

        // verifica si existe
        if (!genero) {
            return res.status(404).json({ mensaje: "Genero no encontrado" })
        }

        // elimino los espacios en blanco
        genero.descripcion = descripcion.trim();
        await genero.save();

        return res.status(201).json({ mensaje: "Genero actualizado" })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error en el servidor al actualizar el genero" })
    }
}

export const borrarGenero = async (req, res) => {
    try {
        const { id } = req.params

        const genero = await Generos.findByPk(id)

        if (!genero) {
            return res.status(404).json({ mensaje: "Género no encontrado" })
        }

        await genero.destroy()

        return res.json({ mensaje: "Género borrado con éxito" })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error en el servidor al borrar el género" })
    }
}
