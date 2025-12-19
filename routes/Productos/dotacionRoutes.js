const express = require("express");
const router = express.Router();
const authMidd = require("../../middleware/authMidd");
const soloAdmin = require("../../middleware/soloAdmin");

const dotacionController = require("../../controllers/Productos/dotacionController");

router.get(
  "/",
  authMidd,
  soloAdmin,
  dotacionController.obtenerProductosDotacionHome
);

router.get(
  "/porcategoria/:id",
  authMidd,
  soloAdmin,
  dotacionController.obtenerListaDeProductosPorCategoriaId
);

router.get(
  "/:id",
  authMidd,
  soloAdmin,
  dotacionController.obtenerProductoPorId
);

router.post(
  "/",
  authMidd,
  dotacionController.crearProductosDotacion
);

router.put(
  "/:id",
  authMidd,
  soloAdmin,
  dotacionController.actualizarProductosDotacion
);

router.delete(
  "/:id",
  authMidd,
  soloAdmin,
  dotacionController.borrarProductosDotacion
);

module.exports = router;
  