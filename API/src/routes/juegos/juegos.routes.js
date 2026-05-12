import { Router } from "express";

const router = Router();

router.get("/juegos", (req, res) => {
    res.send("Obteniendo juegos");
})

router.get("/generos", (req, res) => {
    res.send("Obteniendo géneros");
})

export default router;