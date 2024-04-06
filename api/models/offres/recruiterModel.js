const { Schema, model } = require('mongoose');

// Modèle de responsable RH ou recruteur
const recruiterSchema = new Schema({
    userId: { 
        type: String, 
        required: true 
    },
    fullName: { 
        type: String, 
        required: true 
    },
    position: { 
        type: String, 
        required: false 
    },
    phone: { 
        type: String, 
        required: false 
    },
    email: { 
        type: String, 
        required: false 
    },
    responsibility: { 
        type: String, 
        required: false 
    },
    jobOfferPublished: { 
        type: Boolean, 
        required: true 
    }
})

const recruiterModel = model('Recruiter', recruiterSchema)
module.exports = recruiterModel
