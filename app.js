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

// liste of routes 
app.use(`${API_VERSION}/auth`, authRoutes)
app.use(`${API_VERSION}/offre`, offreRoutes)


module.exports = app