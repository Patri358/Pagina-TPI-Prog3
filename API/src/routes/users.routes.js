import { Router } from "express";
import { Users } from "../models/Users.js";
import { findUsuarios, findUsuarioEmail, actualizarUsuarioRol, eliminarUsuario } from "../services/users.services.js";
import { verificarAutenticacion, verificarPermisos } from "../middlewares/verificarRol.js";

const router = Router();

router.get("/users", findUsuarios)

router.get("/users/:email", findUsuarioEmail)

router.put("/users/:id/rol", actualizarUsuarioRol)

router.delete("/users/:id", eliminarUsuario)

export default router;