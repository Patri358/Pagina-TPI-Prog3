import { DataTypes } from "sequelize";
import { sequelize } from "../../../db";
import { Juegos } from "../Juegos/Juegos";
import { Compras } from "../Compras/Compras";

export const DetalleCompra = sequelize.define("DetalleCompra", {
    id_compra_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_juego_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, { timestamps: false })

Compras.belongsToMany(Juegos, {
    through: DetalleCompra,
    foreignKey: "id_compra_FK",
    otherKey: "id_juego_FK",
    onDelete: "RESTRICT"
})

Juegos.belongsToMany(Compras, {
    through: DetalleCompra,
    foreignKey: "id_juego_FK",
    otherKey: "id_compra_FK",
    onDelete: "RESTRICT"
});

/* Data DetalleCompra

    id_compra_FK INT, 
    id_juego_FK INT,

    PRIMARY KEY (id_compra_FK, id_juego_FK),

    FOREIGN KEY (id_compra_FK) REFERENCES Compras(id)
        ON DELETE RESTRICT,

    FOREIGN KEY id_juego_FK REFERENCES Juegos(id)
        ON DELETE RESTRICT,
*/