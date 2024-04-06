const Joi = require('joi');

// Schéma de validation pour le recruteur
const recruiterSchema = Joi.object({
    fullName: Joi.string().required(),
    position: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    responsibility: Joi.string().optional(),
    jobOfferPublished: Joi.boolean()
});

const validateRecruiters = (req, res, next) => {
    const { error, value } = Joi.array().items(recruiterSchema).validate(req.body);

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Les données sont valides, vous pouvez les ajouter à req.body
    console.log(value);
    // req.body = value;
    next();
};

module.exports = validateRecruiters;
