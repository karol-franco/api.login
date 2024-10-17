// Importamos la conexión a la base de datos
const bcrypt = require('bcryptjs');
const db = require('../config/db');

// Definimos el modelo de usuario
class User {
    // Método para crear un nuevo usuario
    static create(username, email, password, callback) {
        // Encriptamos la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        
        // Ejecutamos la consulta
        db.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) return callback(err);
            return callback(null, results);
        });
    }

    // Método para encontrar un usuario por su nombre de usuario
    static findByEmail(email, callback) {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);
            return callback(null, results[0]); // Retornamos el primer resultado
        });
    }
}

module.exports = User; // Exportamos el modelo
