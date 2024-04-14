const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Middleware de validation des données utilisateur
const validateUuid = (req, res, next) => {
    const userSchema = Joi.object({
        uuid: Joi.string().guid({ version: 'uuidv4' }).required()
    });

    const { error } = userSchema.validate({ ...req.body, uuid: req.params.uuid });
    if (error) {
        return res.status(400).json({ 
            success: false,
            message: error.details[0].message 
        });
    }

    // Les données de l'utilisateur sont valides, passez à l'étape suivante
    next();
};

module.exports = validateUuid;
