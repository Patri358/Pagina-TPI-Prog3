import { Juegos } from "../models/Juegos.js";

export const findJuegos = async (req, res) => {
    const juegos = await Juegos.findAll({
        include: {
            model: Generos,
            through: {
                model: JuegosGeneros,
                attributes: []
            }
        },
    })

    res.json(juegos)
}

export const crearJuego = async (req, res) => {

    const { title, distributor, sinopsis, poster, rating, launch, price, Generos: generosArray } = req.body

    try {
        const newGame = await Juegos.create({
            title,
            distributor,
            sinopsis,
            poster,
            rating,
            launch,
            price
        })

        // Si hay géneros, buscar sus IDs y crear las asociaciones
        if (generosArray && generosArray.length > 0) {
            const generosDB = await Generos.findAll({
                where: {
                    descripcion: generosArray
                }
            })

            if (generosDB.length > 0) {
                await newGame.addGeneros(generosDB)
            }
        }

        // Devolver el juego con sus géneros incluidos
        const gameWithGenres = await Juegos.findByPk(newGame.id, {
            include: {
                model: Generos,
                through: {
                    attributes: []
                }
            }
        })

        res.json(gameWithGenres)
    } catch (error) {
        res.status(500).json({ message: "Error al crear el juego", error: error.message })
    }
}


export const actualizarJuego = (req, res) => {
    const { id } = req.params
    res.send(`Juego con el id ${id} actualizado`)
}

export const borrarJuego = async (req, res) => {

    const { id } = req.params;

    try {
        const deleted = await Juegos.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: "Juego no encontrado" });
        }
        res.json({ message: "Juego eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el juego", error: error.message });
    }
}