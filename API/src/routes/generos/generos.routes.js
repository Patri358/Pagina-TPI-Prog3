import { Router } from "express";

const router = Router();

router.get("/generos", (req, res) => {
    res.send("Obteniendo géneros");
})

export default router;