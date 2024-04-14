const Joi = require('joi');

const addOfferSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    link: Joi.string().required(),
    publicationDate: Joi.date().iso().required(),
    source: Joi.string()
});

const validateAddOffer = (req, res, next) => {
    console.log('pppp');

    const { error } = addOfferSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }
    console.log('icic');
    next();
};

module.exports = validateAddOffer;
