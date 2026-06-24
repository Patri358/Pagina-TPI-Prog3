import { Compras } from "../models/Compras.js";
import { DetalleCompra } from "../models/DetalleCompra.js";
import { Juegos } from "../models/Juegos.js";

export const traerCompras = async (req, res) => {
    const id_usuario_FK = req.user.id;

    try {
        const listaCompras = await Compras.findAll({
            where: { id_usuario_FK },
            include: {
                model: DetalleCompra,
                include: {
                    model: Juegos,
                    attributes: ["id", "title", "poster", "price"]
                }
            }
        });

        return res.json(listaCompras);
    } catch (err) {
        console.error("Error al traer el historial:", err);
        return res.status(500).json({ mensaje: "Error al obtener el historial de compras" });
    }
}

export const crearCompra = async (req, res) => {
    const id_usuario_FK = req.user.id;
    const { total, juegosId } = req.body;

    try {
        const nuevaCompra = await Compras.create({
            id_usuario_FK,
            precio: total
        });

        let detallesCompra = [];

        if (juegosId && juegosId.length > 0) {
            detallesCompra = juegosId.map((id) => {
                return {
                    id_compra_FK: nuevaCompra.id,
                    id_juego_FK: id
                };
            });

            await DetalleCompra.bulkCreate(detallesCompra);
        }

        return res.status(201).json({
            mensaje: "Compra guardada con éxito",
            compraId: nuevaCompra.id
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensaje: "Error en el servidor al procesar la compra" });
    }
}