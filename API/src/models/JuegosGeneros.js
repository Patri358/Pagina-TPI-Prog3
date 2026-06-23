import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";
import { Generos } from "./Generos.js";
import { Juegos } from "./Juegos.js";

// Tabla intermedia para poner mas de 1 género a un juego
export const JuegosGeneros = sequelize.define("JuegosGeneros", {
    id_juego_FK: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: "Juegos", key: "id" },
    },
    id_genero_FK: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
            model: "Generos", key: "id"
        },
    }
}, { timestamps: false })

Juegos.belongsToMany(Generos, {
    through: JuegosGeneros,
    foreignKey: "id_juego_FK",
    otherKey: "id_genero_FK",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Generos.belongsToMany(Juegos, {
    through: JuegosGeneros,
    foreignKey: "id_genero_FK",
    otherKey: "id_juego_FK",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


// Si borro el juego, se borran todas las asociaciones a ese juego y si borro un genero se elimina de todas las asociaciones a ese genero 

/* Tabla JuegosGeneros:

    id_juego_FK INT,
    id_genero_FK INT,

    PRIMARY KEY (id_juego_FK, id_genero_FK),

    FOREIGN KEY (id_juego_FK) REFERENCES Juegos(id)
        ON DELETE CASCADE,

    FOREIGN KEY (id_genero_FK) REFERENCES Generos(id)
        ON DELETE CASCADE,
*/
