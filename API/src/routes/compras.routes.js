import { Router } from "express";
import { Compras } from "../models/Compras.js";
import { DetalleCompra } from "../models/DetalleCompra.js"
import { crearCompra, traerCompras } from "../services/compras.services.js";
import { verificarAutenticacion } from "../middlewares/verificarRol.js";

const router = Router()

router.get("/compras", verificarAutenticacion, traerCompras);

router.post("/compras", verificarAutenticacion, crearCompra);

export default router;