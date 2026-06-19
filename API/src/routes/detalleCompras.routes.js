import { Router } from "express"

const router = Router();

router.get("/detalleCompras/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Obteniendo los detalles de las compras del usuario ${id}`)
})

router.put("/detalleCompras/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Actualizando los detalles de las compras del usuario ${id}`)
})

export default router;