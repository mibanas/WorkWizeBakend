const express = require('express');
const routes = express.Router();

// middlewares
const recruiterMiddleware = require('../../middlewares/offres/recruiterMiddleware')
const authMiddleware = require('../../middlewares/shared/authMiddleware')

// Controllers
const recruiterController = require('../../controllers/offres/recruiterController')


// Routes 
routes.post('/:offreId', authMiddleware, recruiterMiddleware, recruiterController.createRecruiter)
routes.get('/', authMiddleware, recruiterController.getAllRecruiters)
routes.get('/:id', authMiddleware, recruiterController.getRecruiterById)
routes.put('/:id', recruiterController.updateRecruiter)
// routes.delete('/:id', recruiterController.deleteRecruiter)


module.exports = routes;
