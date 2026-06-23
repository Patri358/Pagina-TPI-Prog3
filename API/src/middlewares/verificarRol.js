import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// verifica si está logueado
export const verificarAutenticacion = (req, res, next) => {

    // esto busca el token en el header
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso invalido. Token no encontrado" })
    }

    try {
        // esto tiene todos los atributos del usuario
        const tokenDecodificado = jwt.verify(token, JWT_SECRET)

        // aca se guardan los datos del usuario
        req.user = tokenDecodificado

        // se pasa al siguiente controlador
        next()

    } catch (err) {
        return res.status(403).json({ mensaje: "Token invalido o vencido" })
    }
}

// verifica si tiene permisos
export const verificarPermisos = (...rolesRequeridos) => {
    return (req, res, next) => {
        // esto devuelve si está autenticado o si no tiene el rol que se necesita
        if (!req.user || !req.user.rol) {
            return res.status(401).json({ mensaje: "El usuario no está autenticado o no posee el rol requerido" })
        }

        // esto verifica si el rol coincide con alguno de los parametros
        if (!rolesRequeridos.includes(req.user.rol)) {
            return res.status(403).json({ mensaje: "El usuario no tiene los permisos necesarios" })
        }

        // pasa al controlador
        next();
    }
}