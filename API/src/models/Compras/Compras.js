import { DataTypes } from "sequelize";
import { sequelize } from "../../../db";

export const Compras = sequelize.define("Compras", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario_FK: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", key: "id"
        }
    },
    detalle_compra_FK: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    fecha_compra: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW()

    }
})

/* Data Compras:
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario_FK INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0)
    fecha_compra DATE NOT NULL DEFAULT NOW()

    FOREIGN KEY (id_usuario_FK) REFERENCES Users(id)
        ON DELETE RESTRICT
*/