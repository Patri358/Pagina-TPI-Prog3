import { Router } from "express";
import { Generos } from "../models/Generos.js";

const router = Router();

router.get("/generos", async (req, res) => {
    const generos = await Generos.findAll()
    res.send(generos);
})

router.post("/generos", (req, res) => {
    res.send("Género creado");
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