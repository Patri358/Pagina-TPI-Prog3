import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

// verifica si está autenticado
export const verificarAutenticacion = (req, res, next) => {

    // Busca el token
    const authHeader = req.headers.authorization;

    // verifica si se pasó el token y empieza con Bearer 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            mensaje: "El token no existe o tiene un formato inválido"
        });
    }

    // elimina la palabra Bearer
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            mensaje: "Acceso inválido. Token no encontrado"
        });
    }

    try {

        const tokenDecodificado = jwt.verify(token, JWT_SECRET);

        // guarda los datos del usuario
        req.user = tokenDecodificado;

        // pasa a verificarPermisos
        next();
    } catch (err) {
        return res.status(403).json({
            mensaje: "Token inválido o vencido"
        });
    }
};

// verifica si tiene el rol requerido
export const verificarPermisos = (...rolesRequeridos) => {
    return (req, res, next) => {

        // controla si se guarda el usuario
        if (!req.user || !req.user.rol) {
            return res.status(401).json({
                mensaje: "El usuario no está autenticado o no posee un rol válido"
            });
        }

        // verifica si tiene el rol que se especifica
        if (!rolesRequeridos.includes(req.user.rol)) {
            return res.status(403).json({
                mensaje: "El usuario no tiene los permisos necesarios para realizar esta acción"
            });
        }

        // pasa al controlador
        next();
    };
};