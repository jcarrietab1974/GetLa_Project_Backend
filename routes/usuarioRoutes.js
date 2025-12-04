const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuariosController");
const authMidd = require("../middleware/authMidd");
const esAdmin = require("../middleware/esAdmin");
const upload = require("../config/multer");

// ==============================
//   CRUD COMPLETO PARA LAS CARDS
//   SOLO ADMIN PUEDE OPERAR
// ==============================

// Crear usuario (desde /admin/crear-usuario)
router.post("/", authMidd, esAdmin, usuarioController.crearUsuario);

// Listar todos los usuarios → para pintar las cards
router.get("/", authMidd, esAdmin, usuarioController.listarUsuarios);

// Obtener un usuario por ID
router.get("/:id", authMidd, esAdmin, usuarioController.obtenerUsuario);

// Editar datos de un usuario
router.put("/:id", authMidd, esAdmin, usuarioController.editarUsuario);

// Subir o actualizar foto de usuario (avatar)
router.put(
  "/:id/avatar",
  authMidd,
  esAdmin,
  upload.single("avatar"),
  usuarioController.actualizarAvatar
);

// Eliminar usuario desde una card
router.delete("/:id", authMidd, esAdmin, usuarioController.eliminarUsuario);

module.exports = router;
