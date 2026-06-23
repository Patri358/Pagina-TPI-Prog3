import { Router } from "express";
import { Generos } from "../models/Generos.js";

const router = Router();

router.get("/generos", async (req, res) => {
    try {
        const generos = await Generos.findAll()
        res.send(generos);

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error del servidor al traer los géneros" })
    }

})

router.post("/generos", (req, res) => {
    try {
        const { descripcion } = req.body

        if (!descripcion) {
            return res.status(400).json({ mensaje: "La descripcion es obligatoria" })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).json({ mensaje: "Error del servidor al crear un género" })
    }
})

router.put("/generos/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Género con el id ${id} actualizado`)
})

router.delete("/generos/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Género con el id ${id} eliminado`)
})

export default router;