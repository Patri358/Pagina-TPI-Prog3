import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";
import { Users } from "./Users.js"
import { Juegos } from "./Juegos.js";

export const Biblioteca = sequelize.define("Biblioteca", {

    id_usuario_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Users",
            key: "id"
        }
    },
    id_juego_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Juegos",
            key: "id"
        }
    },
}, { timestamps: false })

// los usuarios pueden tener muchos juegos
Users.belongsToMany(Juegos, {
    through: Biblioteca,
    foreignKey: "id_usuario_FK",
    otherKey: "id_juego_FK",
    onDelete: "RESTRICT"
})

// los juegos pueden estar en la biblioteca de muchos usuarios
Juegos.belongsToMany(Users, {
    through: Biblioteca,
    foreignKey: "id_juego_FK",
    otherKey: "id_usuario_FK",
    // obligatorio por si el juego se borra
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

/* Tabla Biblioteca:
    id_usuario_FK INT
    id_juego_FK INT

    PRIMARY KEY(id_usuario_FK , id_juego_FK)

    FOREIGN KEY (id_usuario_FK) REFERENCES Users(id)
        ON DELETE RESTRICT,

    FOREIGN KEY (id_juego_FK) REFERENCES Juegos(id)
        ON DELETE CASCADE,
*/