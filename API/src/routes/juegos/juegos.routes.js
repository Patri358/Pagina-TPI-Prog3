import { Router } from "express";
import { Juegos } from "../../models/Juegos/Juegos.js";

const router = Router();

router.get("/juegos", (req, res) => {
    res.send("Obteniendo juegos");
})

router.get("/generos", (req, res) => {
    res.send("Obteniendo géneros");
})
router.delete("/juegos/:id", async (req, res) => {
  try {
    const deleted = await Juegos.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }
    res.json({ message: "Juego eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el juego", error: error.message });
  }
});


export default router;