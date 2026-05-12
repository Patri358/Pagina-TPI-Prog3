import { DataTypes } from "sequelize";
import { sequelize } from "../../../db.js";

export const Biblioteca = sequelize.define("Biblioteca", {



})


/* Data Biblioteca:
    id_usuario_FK INT
    id_juego_FK INT

    PRIMARY KEY(id_usuario_FK , id_juego_FK)

    FOREIGN KEY (id_usuario_FK) REFERENCES Users(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (id_juego_FK) REFERENCES Juegos(id)
        ON DELETE CASCADE,
*/