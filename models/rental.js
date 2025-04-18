const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Az ügyfél nevének megadása kötelezõ'],
        trim: true
    },
    vhsTitle: {
        type: String,
        required: [true, 'A VHS címének megadása kötelezõ'],
        trim: true
    },
    rentalDate: {
        type: Date,
        required: [true, 'A kölcsönzés dátumának megadása kötelezõ'],
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: [true, 'A visszahozatal dátumának megadása kötelezõ']
    },
    status: {
        type: String,
        required: [true, 'Az állapot megadása kötelezõ'],
        enum: ['aktív', 'visszahozott', 'lejárt'],
        default: 'aktív'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rental', rentalSchema);
