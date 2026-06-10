import express from "express";
import authRoutes from "./routes/auth.routes.js";
import juegosRoutes from "./routes/juegos/juegos.routes.js"
import usersRoutes from "./routes/users/users.routes.js";
import generosRoutes from "./routes/generos/generos.routes.js";

import { Users } from "./models/Users/Users.js";

import { PORT } from "./config.js";
import { sequelize } from "../db.js";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(usersRoutes);
app.use(generosRoutes);
app.use(juegosRoutes)

try {
    await sequelize.sync();

    app.listen(PORT);

    console.log(`Servidor escuchando en el puerto ${PORT}`);
} catch (error) {
    console.log("Hubo un error en la inicialización", error);
}