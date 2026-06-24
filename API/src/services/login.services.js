import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../models/Users.js";
import { JWT_SECRET } from "../config.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
    }

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ mensaje: "Email o contraseña incorrectos" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ mensaje: "Email o contraseña incorrectos" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      rol: user.rol,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      token,
      user: payload,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno al iniciar sesión" });
  }
};