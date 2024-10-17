// Importamos el módulo mysql2
const mysql = require('mysql2');
require('dotenv').config();

// Configuramos la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Host de la base de datos
    user: process.env.DB_USER, // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos
    database: process.env.DB_NAME // Nombre de la base de datos
});

// Conectamos a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = db; // Exportamos la conexión
