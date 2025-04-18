const mongoose = require('mongoose');

const vhsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    releaseYear: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },
    genre: {
        type: String,
        required: true,
        enum: ['Akció', 'Kaland', 'Animáció', 'Komédia', 'Dráma', 'Fantasy', 'Horror', 'Misztikus', 'Romantikus', 'Sci-Fi', 'Thriller']
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vhs', vhsSchema);
