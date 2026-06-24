import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";
import { Juegos } from "./Juegos.js";
import { Compras } from "./Compras.js";

export const DetalleCompra = sequelize.define("DetalleCompra", {
    id_compra_FK: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: "Compras",
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
    }
}, { timestamps: false })

// una compra puede tener muchos juegos
Compras.belongsToMany(Juegos, {
    through: DetalleCompra,
    foreignKey: "id_compra_FK",
    otherKey: "id_juego_FK",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

// un juego puede estar en muchos detalles de compras
Juegos.belongsToMany(Compras, {
    through: DetalleCompra,
    foreignKey: "id_juego_FK",
    otherKey: "id_compra_FK",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
});


// una compra puede tener muchos DetalleCompra pero un DetalleCompra apunta a una sola compra
Compras.hasMany(DetalleCompra, { foreignKey: "id_compra_FK" });
DetalleCompra.belongsTo(Compras, { foreignKey: "id_compra_FK" });

// un juego puede aparecer en muchos detalleCompra pero un detalleCompra apunta a un solo juego
Juegos.hasMany(DetalleCompra, { foreignKey: "id_juego_FK" });
DetalleCompra.belongsTo(Juegos, { foreignKey: "id_juego_FK" });

/* Tabla DetalleCompra

    id_compra_FK INT, 
    id_juego_FK INT,

    PRIMARY KEY (id_compra_FK, id_juego_FK),

    FOREIGN KEY (id_compra_FK) REFERENCES Compras(id)
        ON DELETE RESTRICT,

    FOREIGN KEY id_juego_FK REFERENCES Juegos(id)
        ON DELETE RESTRICT,
*/