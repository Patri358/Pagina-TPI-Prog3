import bcrypt from "bcrypt";
import { Users } from "../models/Users.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email o contraseña incorrectos" });
    }

    return res.status(200).json({
      token: "fake-token-12345",
      user: {
        id: user.id,
        username: user.username,
        nombre_real: user.nombre_real,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno al iniciar sesión" });
  }
};