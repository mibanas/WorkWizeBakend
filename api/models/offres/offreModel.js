const { Schema, model } = require('mongoose');

// Modèle d'offre d'emploi
const jobOfferSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: false 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    link: { 
        type: String, 
        required: true 
    },
    publicationDate: { 
        type: Date, 
        required: true 
    },
    company: { 
        type: Schema.Types.ObjectId, 
        ref: 'Company', 
        required: false 
    },
    recruiters: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Recruiter' 
    }],
    source: { 
        type: String, 
        required: false 
    },
    isDeleted: { 
        type: Boolean, 
        required: true,
        default : false 
    },
    status: { 
        type: Schema.Types.ObjectId, 
        ref: 'Status', 
        required: true 
    }

}, { timestamps: true })

const JobOffer = model('JobOffer', jobOfferSchema)
module.exports = JobOffer