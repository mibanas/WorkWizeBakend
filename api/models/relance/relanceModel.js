const mongoose = require('mongoose');
const OfferStatus = require('../../utils/offreStatus');
const { number } = require('joi');

const relanceRecruteurSchema = new mongoose.Schema({
    idOffre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offre', 
        required: true
    },
    dateRelance: {
        type: Date,
        required: true
    },
    dayRelance: {
        type: Number,
        required: true,
        default : 7
    },
    status: { 
        type: String, 
        enum: Object.values(OfferStatus), 
        required: true 
    }
}, {
    timestamps: true
});

const RelanceRecruteur = mongoose.model('RelanceRecruteur', relanceRecruteurSchema);

module.exports = RelanceRecruteur;
