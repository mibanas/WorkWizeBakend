const Joi = require('joi');

const validateRegister = (req, res, next) => {
    const userSchema = Joi.object({
        first_name: Joi.string().required().min(3),
        last_name: Joi.string().required().min(3),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            success: false,
            error: error.details[0].message 
        });
    }

    // Les données de l'utilisateur sont valides, passez à l'étape suivante
    next();
};

module.exports = validateRegister;
