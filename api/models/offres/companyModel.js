const { Schema, model } = require('mongoose');

// Modèle d'entreprise
const companySchema = new Schema({
    companyName: { 
        type: String, 
        required: true 
    },
    city: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: false 
    },
    phone: { 
        type: String, 
        required: false 
    },
    website: { 
        type: String, 
        required: true 
    },
    isDeleted: { 
        type: Boolean, 
        required: true,
        default : false
    }
})

const Company = model('Company', companySchema)
module.exports = Company