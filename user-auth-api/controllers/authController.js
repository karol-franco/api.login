const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Función para registrar un nuevo usuario
const register = (req, res) => {
    const { username, email, password } = req.body; // Obtenemos el username y password del cuerpo de la solicitud
    User.create(username, email, password, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al registrar el usuario.' });
        }
        return res.status(201).json({ message: 'Usuario registrado con éxito.' });
    });
};

// Función para iniciar sesión
const login = (req, res) => {
    const {email, password } = req.body; // Obtenemos el username y password del cuerpo de la solicitud
    User.findByEmail(email, (err, user) => {
        if (err || !user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        // Verificamos la contraseña
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }
        // Creamos un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token }); // Retornamos el token
    });
};

module.exports = { register, login }; // Exportamos las funciones
