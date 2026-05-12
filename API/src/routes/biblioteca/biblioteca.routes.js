import { Router } from "express";

const router = Router();

router.get("/biblioteca/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Obteniendo biblioteca del usuario ${id}`)
})

router.post("biblioteca/:id", (req, res) => {
    res.send(`Creando biblioteca`)
})

router.put("biblioteca/:id", (req, res) => {
    const { id } = req.params
    res.send(`Actualizando biblioteca del usuario ${id}`)
})

export default router;