require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const cors = require('cors');

// Globale Variables 
const API_VERSION = process.env.API_VERSION

const app = express()

// Generale Middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));

// require all needed routes to the project :)
const authRoutes = require('./api/routes/authentification/authRoute')
const offreRoutes = require('./api/routes/offres/offreRoute')
const companyRoutes = require('./api/routes/offres/companyRoute')
const recruiterRoutes = require('./api/routes/offres/recruiterRoute')
const condidatureRoutes = require('./api/routes/condidature/condidatureRoute')

// liste of routes 
app.use(`${API_VERSION}/auth`, authRoutes)
app.use(`${API_VERSION}/offre`, offreRoutes)
app.use(`${API_VERSION}/company`, companyRoutes)
app.use(`${API_VERSION}/recruiter`, recruiterRoutes)
app.use(`${API_VERSION}/application`, condidatureRoutes)


module.exports = app