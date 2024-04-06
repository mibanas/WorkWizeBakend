const express = require('express')
const routes = express.Router()

// middlewares
const validateAddOffer = require('../../middlewares/offres/offreMiddleware')
const authMiddleware = require('../../middlewares/offres/authMiddleware')

// // Controllers
const offreController = require('../../controllers/offres/offreController')


// // Routes 
routes.get('/all', authMiddleware, offreController.getOffers);
routes.post('/', authMiddleware, validateAddOffer, offreController.addOffer)
routes.get('/:id', authMiddleware, offreController.getOfferById)
routes.patch('/:id', authMiddleware, offreController.updateOffer)
routes.post('/delete/:id', authMiddleware, offreController.deleteOffer)


module.exports = routes