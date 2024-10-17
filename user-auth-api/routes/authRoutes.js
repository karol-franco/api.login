const express = require('express');
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware')
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para iniciar sesión
router.post('/login', login);

router.get('/profile', verifyToken, (req, res) => {
    res.json({ id: req.user.id, username: req.user.username})
});

module.exports = router; // Exportamos las rutas
