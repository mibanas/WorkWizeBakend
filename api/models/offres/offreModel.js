const { Schema, model } = require('mongoose');
const OfferStatus = require('../../utils/offreStatus')

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
        type: String, 
        enum: Object.values(OfferStatus), 
        required: true 
    }
})

const JobOffer = model('JobOffer', jobOfferSchema)
module.exports = JobOffer