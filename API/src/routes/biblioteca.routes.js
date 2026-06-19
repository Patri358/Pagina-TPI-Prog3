import { Router } from "express";

const router = Router();

router.get("/biblioteca/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Obteniendo juegos de la biblioteca del usuario ${id}`)
})

router.put("/biblioteca/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Actualizando juegos de la biblioteca del usuario ${id}`)
})

export default router;