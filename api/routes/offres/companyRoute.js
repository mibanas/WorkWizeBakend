const express = require('express');
const router = express.Router();

// middlewares
const authMiddleware = require('../../middlewares/offres/authMiddleware')

// Controllers
const companyController = require('../../controllers/offres/companyController')

// // Routes 
router.post('/:offerId', authMiddleware, companyController.createCompany)
router.get('/', authMiddleware, companyController.getCompanies)
router.put('/:id', authMiddleware, companyController.updateCompany)
router.delete('/:id', authMiddleware, companyController.deleteCompany)

module.exports = router;
