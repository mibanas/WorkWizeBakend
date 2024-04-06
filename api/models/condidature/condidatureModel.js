const mongoose = require('mongoose');
const OfferStatus = require('../../utils/offreStatus')

const candidatureSchema = new mongoose.Schema({
    offreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offre', 
        required: true
    },
    dateCandidature: {
        type: Date,
        default: Date.now
    },
    modeEnvoi: {
        type: String,
        enum: ['email', 'site web', 'courrier', 'autre'],
        required: true
    },
    cv: {
        type: String, 
        required: false 
    },
    lettreMotivation: {
        type: String, 
        required: false 
    },
    status: { 
        type: String, 
        enum: Object.values(OfferStatus), 
        required: true 
    }
}, {
    timestamps: true
});

const Candidature = mongoose.model('Candidature', candidatureSchema);

module.exports = Candidature;
