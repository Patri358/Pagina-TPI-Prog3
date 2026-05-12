import { Router } from "express";

const router = Router();

router.get("/generos", (req, res) => {
    res.send("Obteniendo géneros");
})

router.get("/generos/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Obteniendo género con el id ${id}`);
})

router.post("/generos", (req, res) => {
    res.send("Creando género");
})

router.put("/generos/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Actualizando género con el id ${id}`)
})

router.delete("/generos/:id", (req, res) => {
    const { id } = req.params;
    res.send(`Borrando género con el id ${id}`)

})

export default router;