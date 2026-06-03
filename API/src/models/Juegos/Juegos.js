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
    distribuidor: {
        type: DataTypes.STRING(100),
    },
    synopsis: {
        type: DataTypes.TEXT
    },
    poster: {
        type: DataTypes.STRING(255),
    },
    launch: {
        type: DataTypes.DATE,
        defaultValue: DATEONLY
    },
    precio: {
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
    distribuidor VARCHAR (100),
    synopsis TEXT,
    poster VARCHAR(255),
    launch DATE DEFAULT (CURRENT_DATE()),
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
*/

// timestamps: esto es para que no se agregue las columnas de fecha_actualizacion y fecha_creacion