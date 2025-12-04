const Usuario = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");

// ============================================
//   CREAR USUARIO
// ============================================
exports.crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    usuario = new Usuario(req.body);

    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    const usuarioAlmacenado = await usuario.save();

    // Retornar datos sin contraseña
    const { password: pwd, ...resto } = usuarioAlmacenado._doc;

    res.json(resto);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error al crear el usuario" });
  }
};

// ============================================
//   LISTAR USUARIOS (para pintar las CARDS)
// ============================================
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select(
      "nombre email rol area avatar registro"
    );
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al listar usuarios" });
  }
};

// ============================================
//   OBTENER UN USUARIO POR ID
// ============================================
exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select(
      "nombre email rol area avatar registro"
    );

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener usuario" });
  }
};

// ============================================
//   EDITAR USUARIO
// ============================================
exports.editarUsuario = async (req, res) => {
  try {
    const { nombre, email, rol, area } = req.body;

    const campos = {};
    if (nombre) campos.nombre = nombre;
    if (email) campos.email = email;
    if (rol) campos.rol = rol;
    if (area) campos.area = area;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      campos,
      { new: true }
    ).select("nombre email rol area avatar registro");

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al editar usuario" });
  }
};

// ============================================
//   ACTUALIZAR AVATAR (FOTO)
// ============================================
exports.actualizarAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No se envió imagen" });
    }

    const ruta = `/uploads/avatars/${req.file.filename}`;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { avatar: ruta },
      { new: true }
    ).select("nombre email rol area avatar registro");

    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar avatar" });
  }
};

// ============================================
//   ELIMINAR USUARIO
// ============================================
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({ msg: "Usuario eliminado correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al eliminar usuario" });
  }
};
