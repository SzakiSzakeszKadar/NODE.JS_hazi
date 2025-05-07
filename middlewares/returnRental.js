const Rental = require('../models/rental');
const Vhs = require('../models/vhs');

module.exports = async (req, res, next) => {
    try {
        const rentalId = req.params.id;
        
        // K�lcs�nz�s keres�se
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            throw new Error('A k�lcs�nz�s nem tal�lhat�');
        }

        // K�lcs�nz�s friss�t�se
        await Rental.findByIdAndUpdate(rentalId, {
            status: 'visszahozott'
        });

        // VHS friss�t�se el�rhet�v�
        await Vhs.findByIdAndUpdate(rental.vhsId, {
            available: true
        });

        // �tir�ny�t�s a k�lcs�nz�sek list�j�ra
        res.redirect('/rental');
    } catch (error) {
        next(error);
    }
}; 