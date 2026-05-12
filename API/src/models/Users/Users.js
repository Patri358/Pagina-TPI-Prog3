import { sequelize } from "../../../db.js";
import { DataTypes } from "sequelize";

export const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nombre_real: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
});


/* Data Users
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    nombre_real VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
*/