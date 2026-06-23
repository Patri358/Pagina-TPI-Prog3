import express from "express";

// models
import "./models/Juegos.js";
import "./models/Users.js";
import "./models/Compras.js";
import "./models/Generos.js";
import "./models/JuegosGeneros.js"
import "./models/Biblioteca.js";
import "./models/DetalleCompra.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import bibiotecaRoutes from "./routes/biblioteca.routes.js";
import comprasRoutes from "./routes/compras.routes.js";
import detalleComprasRoutes from "./routes/detalleCompras.routes.js";
import generosRoutes from "./routes/generos.routes.js";
import juegosRoutes from "./routes/juegos.routes.js"
import usersRoutes from "./routes/users.routes.js";

import { PORT } from "./config.js";
import { sequelize } from "../db.js"

import cors from "cors";

const app = express();

try {
    app.use(express.json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "*")
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        next()
    })
    app.use(cors());

    // rutas
    app.use(authRoutes);
    app.use(bibiotecaRoutes);
    app.use(comprasRoutes);
    app.use(detalleComprasRoutes);
    app.use(generosRoutes);
    app.use(juegosRoutes);
    app.use(usersRoutes);

    await sequelize.sync();

    app.listen(PORT);

    console.log(`Servidor escuchando en el puerto ${PORT}`);
} catch (error) {
    console.log("Hubo un error en la inicialización", error);
}