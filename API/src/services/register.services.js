import bcrypt from "bcrypt";
import { Users } from "../models/Users/Users.js";

export const registerUser = async (req, res) => {
    try {
        const { username, nombre_real, email, password } = req.body;

        if (!username || !nombre_real || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "El email ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            username,
            nombre_real,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Usuario registrado",
            user: {
                id: newUser.id,
                username: newUser.username,
                nombre_real: newUser.nombre_real,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno al registrar usuario" });
    }
};