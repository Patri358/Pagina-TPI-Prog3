import { DataTypes } from "sequelize";
import { sequelize } from "../../../db";
import { Generos } from "./Generos";
import { Juegos } from "./Juegos";

// Tabla intermedia para poner mas de 1 género a un juego
export const Juegos_Generos = sequelize.define("Juegos_Generos", {
    id_juego_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "Juegos", key: "id" }
    },
    id_genero_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "Generos", key: "id" }
    }
})

Juego.belongsToMany(Genero, {
    through: Juego_Genero,
    foreignKey: "id_juego_FK",
    otherKey: "id_genero_FK"
});

Genero.belongsToMany(Juego, {
    through: Juegos_Generos,
    foreignKey: "id_genero_FK",
    otherKey: "id_juego_FK"
});

/* Datos Juego_Genero:

    id_juego_FK INT,
    id_genero_FK INT,

    PRIMARY KEY (id_juego_FK, id_genero_FK),

    FOREIGN KEY (id_juego_FK) REFERENCES Juegos(id)
        ON DELETE CASCADE,

    FOREIGN KEY (id_genero_FK) REFERENCES Generos(id)
        ON DELETE CASCADE,
*/
