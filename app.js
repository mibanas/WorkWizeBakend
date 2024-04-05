require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const cors = require('cors');

// Globale Variables 
const API_VERSION = process.env.API_VERSION

const app = express()


module.exports = app