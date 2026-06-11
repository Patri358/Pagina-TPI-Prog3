import { DataTypes, DATEONLY } from "sequelize";
import { sequelize } from "../../../db.js";

export const Juegos = sequelize.define("Juegos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    distributor: {
        type: DataTypes.STRING(100),
    },
    sinopsis: {
        type: DataTypes.TEXT
    },
    poster: {
        type: DataTypes.STRING(255),
    },
    rating: {
        type: DataTypes.ENUM("Apto para todo público", "Apto para mayores de 10", "Apto para mayores de 18"),
        allowNull: false
    },
    launch: {
        type: DataTypes.DATEONLY,
        defaultValue: DATEONLY
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        allowNull: false,
        validate: {
            min: 0
        }
    },
}, { timestamps: false })

/* Datos Juego:
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    distributor VARCHAR (100),
    sinopsis TEXT,
    poster VARCHAR(255),
    rating ENUM("Apto para todo público", "Apto para mayores de 10", "Apto para mayores de 18") NOT NULL
    launch DATE DEFAULT (CURRENT_DATE()),
    price DECIMAL(10,2) NOT NULL CHECK (precio > 0),
*/

// timestamps: esto es para que no se agregue las columnas de fecha_actualizacion y fecha_creacion}