const express = require('express')
const routes = express.Router()

// middlewares
const checkUser = require('../../middlewares/authentification/checkUser')
const validateRegister = require('../../middlewares/authentification/validateRegister')
const validateUuid = require('../../middlewares/authentification/validateUuid')
const validateLogin = require('../../middlewares/authentification/validateLogin')


// Controllers
const Authentification = require('../../controllers/authentification/authController')

// Routes 
routes.post('/register', checkUser ,validateRegister, Authentification.register)
routes.post('/validate/:uuid', validateUuid, Authentification.validate)
routes.post('/login', validateLogin, Authentification.login)


module.exports = routes