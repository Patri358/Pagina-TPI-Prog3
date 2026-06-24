import { Router } from "express";
import { Juegos } from "../models/Juegos.js";
import { Generos } from "../models/Generos.js";
import { JuegosGeneros } from "../models/JuegosGeneros.js";
import { verificarAutenticacion, verificarPermisos } from "../middlewares/verificarRol.js";
import { actualizarJuego, borrarJuego, crearJuego, findJuegos } from "../services/juegos.services.js";

const router = Router();

router.get("/juegos", findJuegos);

router.post("/juegos", crearJuego)

router.put("/juegos/:id", actualizarJuego)

router.delete("/juegos/:id", borrarJuego)

export default router;