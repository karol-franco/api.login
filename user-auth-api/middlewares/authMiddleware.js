const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Obtenemos el token del encabezado

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        req.user = {id: decoded.id}; // Guardamos el ID del usuario en la solicitud
        next(); // Llamamos al siguiente middleware
    });
};

module.exports = verifyToken; // Exportamos el middleware
