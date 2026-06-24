import { Router } from "express";
import { Generos } from "../models/Generos.js";
import { findGeneros, createGenero, actualizarGenero, borrarGenero } from "../services/generos.services.js";
import { verificarAutenticacion, verificarPermisos } from "../middlewares/verificarRol.js";

const router = Router();

// todos usuarios logueados pueden traer todos los géneros 
router.get("/generos", verificarAutenticacion, verificarPermisos("user", "admin", "superAdmin"), findGeneros)

// solo los admin y superAdmin logueados pueden crear un género
router.post("/generos", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), createGenero)

// solo los admin y superAdmin logueados pueden actualizar un género
router.put("/generos/:id", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), actualizarGenero)

// solo los admin y superAdmin logueados pueden borrar un género
router.delete("/generos/:id", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), borrarGenero)

export default router;