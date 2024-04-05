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


// liste of routes 
app.use(`${API_VERSION}/auth`, authRoutes)



module.exports = app