const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    vhsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vhs',
        required: true
    },
    rentalDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['akt�v', 'visszahozott', 'lej�rt'],
        default: 'akt�v'
    }
}, {
    timestamps: true
});

// Ellen�rizz�k, hogy a modell m�r l�tezik-e
module.exports = mongoose.models.Rental || mongoose.model('Rental', rentalSchema);
