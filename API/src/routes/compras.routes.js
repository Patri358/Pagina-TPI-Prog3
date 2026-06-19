import { Router } from "express";

const router = Router()

router.get("/compras/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Obteniendo el listado de compras del usuario ${id}`)
})

router.put("/compras/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Actualizando el listado de compras del usuario ${id}`)
})

export default router;