import { Router } from "express";
import { Users } from "../models/Users.js";
import { findUsuarios, findUsuarioEmail, actualizarUsuarioRol, eliminarUsuario } from "../services/users.services.js";
import { verificarAutenticacion, verificarPermisos } from "../middlewares/verificarRol.js";

const router = Router();

// solo los admin y superAdmin logueados pueden traer a los usuarios
router.get("/users", verificarAutenticacion, verificarPermisos("admin", "superAdmin"), findUsuarios)

// si está logueado puede traer al usuario
router.get("/users/:email", verificarAutenticacion, findUsuarioEmail)

// solo los superAdmin logueados pueden editar usuarios
router.put("/users/:id/rol",verificarAutenticacion, verificarPermisos("superAdmin"), actualizarUsuarioRol)

// solo los superAdmin logueados pueden borrar usuarios
router.delete("/users/:id", verificarAutenticacion, verificarPermisos("superAdmin"), eliminarUsuario)

export default router;