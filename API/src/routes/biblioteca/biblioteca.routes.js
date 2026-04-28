import { Router } from "express";

const router = Router();

router.get("/biblioteca/:id", (req, res) => {
    const {id} = req.params;
    res.send(`Obteniendo biblioteca del usuario ${id}`)
})

export default router;