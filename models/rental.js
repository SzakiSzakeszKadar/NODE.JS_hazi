const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Az �gyf�l nev�nek megad�sa k�telez�'],
        trim: true
    },
    vhsTitle: {
        type: String,
        required: [true, 'A VHS c�m�nek megad�sa k�telez�'],
        trim: true
    },
    rentalDate: {
        type: Date,
        required: [true, 'A k�lcs�nz�s d�tum�nak megad�sa k�telez�'],
        default: Date.now
    },
    returnDate: {
        type: Date,
        required: [true, 'A visszahozatal d�tum�nak megad�sa k�telez�']
    },
    status: {
        type: String,
        required: [true, 'Az �llapot megad�sa k�telez�'],
        enum: ['akt�v', 'visszahozott', 'lej�rt'],
        default: 'akt�v'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rental', rentalSchema);
