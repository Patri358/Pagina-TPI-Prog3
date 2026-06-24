import { Router } from "express";
import { Generos } from "../models/Generos.js";
import { findGeneros, createGenero, actualizarGenero, borrarGenero } from "../services/generos.services.js";
import { verificarAutenticacion, verificarPermisos } from "../middlewares/verificarRol.js";

const router = Router();

// traer todos los géneros
router.get("/generos", findGeneros)

// crear un género
router.post("/generos", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), createGenero)

// actualizar un género
router.put("/generos/:id", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), actualizarGenero)

// borrar un género
router.delete("/generos/:id", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), borrarGenero)

export default router;