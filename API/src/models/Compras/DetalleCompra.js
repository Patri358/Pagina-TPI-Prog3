import { DataTypes } from "sequelize";
import { sequelize } from "../../../db";

export const DetalleCompra = sequelize.define("DetalleCompra", {



})

/* Data DetalleCompra

    id_compra_FK INT, 
    id_juego_FK INT,

    PRIMARY KEY (id_compra_FK, id_juego_FK),

    FOREIGN KEY (id_compra_FK) REFERENCES Compras(id)
        ON DELETE RESTRICT,

    FOREIGN KEY id_juego_FK REFERENCES Juegos(id)
        ON DELETE RESTRICT,
*/