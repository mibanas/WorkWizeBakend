const mongoose = require('mongoose');
const OfferStatus = require('../../utils/offreStatus')

const statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: Object.values(OfferStatus), 
        unique: true,
    }
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
