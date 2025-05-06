const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    membershipType: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold'],
        required: true
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Ellen�rizz�k, hogy a modell m�r l�tezik-e
module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
