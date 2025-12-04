const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// Importación de rutas
const usuarioRoutes = require("./routes/usuarioRoutes");
const auth = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json({ extended: true }));
//Habilitar CORS
app.use(cors());


//Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", auth);


// Conectar a la base de datos
conectarDB();


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});










