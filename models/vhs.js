const mongoose = require('mongoose');

const vhsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Ellenõrizzük, hogy a modell már létezik-e
module.exports = mongoose.models.Vhs || mongoose.model('Vhs', vhsSchema);
