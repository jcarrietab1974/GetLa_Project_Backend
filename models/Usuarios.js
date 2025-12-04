const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  // Aquí solo guardamos el texto del rol,
  // sin enum, porque tú lo manejas en el frontend y en la lógica
  rol: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  registro: {
    type: Date,
    default: Date.now,
  },

  // 🆕 FOTO DEL USUARIO (para las cards)
  avatar: {
    type: String, // ej: "/uploads/avatars/1732839472000-123.png"
  },

  // 🆕 ÁREA DE TRABAJO DEL USUARIO (opcional, para tus pantallas)
  area: {
    type: String, // ej: "REPUESTOS", "MANTENCION", etc.
  },
});

module.exports = mongoose.model("Usuarios", UsuariosSchema);
