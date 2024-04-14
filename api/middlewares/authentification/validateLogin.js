const Joi = require('joi');

// Middleware de validation des données utilisateur
const validateLogin = (req, res, next) => {
    console.log('Joi départ');
    
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success : false,
            error: error.details[0].message 
        });
    }
    console.log('Joi');
    // Les données de l'utilisateur sont valides, passez à l'étape suivante
    next();
};

module.exports = validateLogin;
