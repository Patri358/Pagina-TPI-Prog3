import { Router } from "express";
import { Juegos } from "../models/Juegos.js";
import { Generos } from "../models/Generos.js";
import { JuegosGeneros } from "../models/JuegosGeneros.js";
import { verificarAutenticacion, verificarPermisos } from "../middlewares/verificarRol.js";
import { actualizarJuego, borrarJuego, crearJuego, findJuegos } from "../services/juegos.services.js";

const router = Router();

// si está logueado puede traer los juegos
router.get("/juegos", verificarAutenticacion, findJuegos);

// solo los admin y superAdmin logueados pueden crear juegos
router.post("/juegos", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), crearJuego);

// solo los admin y superAdmin logueados pueden editar juegos
router.put("/juegos/:id", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), actualizarJuego);

// solo los admin y superAdmin logueados pueden borrar juegos
router.delete("/juegos/:id", verificarAutenticacion, verificarPermisos("admin","superAdmin"), borrarJuego);

export default router;