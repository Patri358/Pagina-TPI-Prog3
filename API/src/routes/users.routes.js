import { Router } from "express";
import { Users } from "../models/Users.js";

const router = Router();

router.get("/users", async (req, res) => {
    const usuarios = await Users.findAll();
    res.send(usuarios);
})

router.get("/users/:email", async (req, res) => {
    const { email } = req.params

    const User = await Users.findOne({ where: { email } })

    res.json(User)
})

router.post("/users", (req, res) => {
    res.send(`Creando usuario`)
})

router.put("/users/:id", (req, res) => {
    const { id } = req.params
    res.send(`Actualizando usuario con id: ${id}`)
})

router.delete("/users/:id", (req, res) => {
    const { id } = req.params
    res.send(`Borrando usuario con id: ${id}`)
})

export default router;