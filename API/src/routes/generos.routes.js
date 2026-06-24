import { Router } from "express";
import { Generos } from "../models/Generos.js";
import { findGeneros, createGenero, actualizarGenero, borrarGenero } from "../services/generos.services.js";
import { verificarAutenticacion, verificarPermisos } from "../middlewares/verificarRol.js";

const router = Router();

// traer todos los géneros
router.get("/generos", findGeneros)

// crear un género
router.post("/generos", createGenero)

// actualizar un género
router.put("/generos/:id", actualizarGenero)

// borrar un género
router.delete("/generos/:id", borrarGenero)

export default router;