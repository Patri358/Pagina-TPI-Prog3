import express from "express";
import cors from "cors";

// models
import "./models/Juegos.js";
import "./models/Users.js";
import "./models/Compras.js";
import "./models/Generos.js";
import "./models/JuegosGeneros.js"

// routes
import authRoutes from "./routes/auth.routes.js";
import comprasRoutes from "./routes/compras.routes.js";
import generosRoutes from "./routes/generos.routes.js";
import juegosRoutes from "./routes/juegos.routes.js"
import usersRoutes from "./routes/users.routes.js";

import { PORT } from "./config.js";
import { sequelize } from "../db.js"

const app = express();

try {
    app.use(express.json());


    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(authRoutes);
    app.use(comprasRoutes);
    app.use(generosRoutes);
    app.use(juegosRoutes);
    app.use(usersRoutes);

    await sequelize.sync();
    app.listen(PORT);

    console.log(`Servidor escuchando en el puerto ${PORT}`);
} catch (error) {
    console.log("Hubo un error en la inicialización", error);
}