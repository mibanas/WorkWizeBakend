const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Récupérer le token d'authentification depuis les en-têtes de la requête

    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Authorization token is required' 
        })
    }

    token = token.split(' ')[1]

    // Vérifier et décoder le token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            })
        }

        // Le token est valide, ajouter les informations de l'utilisateur à la requête
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
