const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true,
    },
    compte_active: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    signup_attempts: {
        type: Number,
        default: 0
    },
    last_attempt_at: {
        type: Date,
        default: null
    },
    lockout_until: {
        type: Date,
        default: null
    },
    ip_address: {
        type: String,
        default: null
    },
    device_fingerprint: {
        type: String,
        default: null
    },
});

const User = model('User', userSchema);

module.exports = User;
