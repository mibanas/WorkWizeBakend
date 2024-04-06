const express = require('express');
const routes = express.Router();

// middlewares
const recruiterMiddleware = require('../../middlewares/offres/recruiterMiddleware')
const authMiddleware = require('../../middlewares/shared/authMiddleware')

// Controllers
const candidatureController = require('../../controllers/condidature/condidatureController');



routes.post('/:id', candidatureController.createCandidature)
routes.get('/', candidatureController.getAllCandidatures)
routes.get('/:id', candidatureController.getCandidatureById)
routes.put('/:id', candidatureController.updateCandidature)
routes.delete('/:id', candidatureController.deleteCandidature);

module.exports = routes
