const express = require("express");
const conectarDB = require("./config/db");


const app = express();




// Conectar a la base de datos
conectarDB();




const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});










