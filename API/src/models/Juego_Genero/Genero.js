import { DataTypes } from "sequelize";
import { sequelize } from "../../../db";

export const Genero = sequelize.define("genero", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, { timestamps: false })

/* Datos Generos:
    id INT PRIMARY KEY AUTOINCREMENT,
    descripcion VARCHAR(100) NOT NULL
*/

// timestamps: esto es para que no se agregue las columnas de fecha_actualizacion y fecha_creacion