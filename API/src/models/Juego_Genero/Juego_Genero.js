import { DataTypes } from "sequelize";
import { sequelize } from "../../../db";
import { Genero } from "./Genero";
import { Juego } from "./Juego";

// Tabla intermedia para poner mas de 1 genero a un juego
export const Juego_Genero = sequelize.define("juego_genero", {
    id_juego_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "juego", key: "id" }
    },
    id_genero_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: { model: "genero", key: "id" }
    }
})

Juego.belongsToMany(Genero, {
    through: Juego_Genero,
    foreignKey: "id_juego_FK",
    otherKey: "id_genero_FK"
});

Genero.belongsToMany(Juego, {
    through: Juego_Genero,
    foreignKey: "id_genero_FK",
    otherKey: "id_juego_FK"
});

/* Datos Juego_Genero:

    id_juego_FK INT,
    id_genero_FK INT,

    PRIMARY KEY (id_juego_FK, id_genero_FK),

    FOREIGN KEY (id_juego_FK) REFERENCES Juego(id)
        ON DELETE CASCADE,

    FOREIGN KEY (id_genero_FK) REFERENCES Genero(id)
        ON DELETE CASCADE,
*/
