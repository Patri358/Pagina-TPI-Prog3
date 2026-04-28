import express from "express";

import { PORT } from "./config.js";
import { sequelize } from "../db.js";

import usersRoutes from "./routes/users/users.routes.js";
import generosRoutes from "./routes/generos/generos.routes.js";

const app = express();

try {
    app.listen(PORT);
    app.use(usersRoutes);
    app.use(generosRoutes);

    await sequelize.sync();

    console.log(`Servidor escuchando en el puerto ${PORT}`);

} catch (error) {
    console.log("Hubo un error en la inicialización");
}