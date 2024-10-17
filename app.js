const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require('./user-auth-api/routes/authRoutes');
const db = require('./user-auth-api/config/db'); // Importamos la conexión a la base de datos
require('dotenv').config()

dotenv.config(); // Cargamos las variables de entorno

const app = express();
app.use(helmet()); // Usamos Helmet para seguridad
app.use(express.json()); // Middleware para parsear JSON

// Configuramos las rutas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000; // Puerto por defecto
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
