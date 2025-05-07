const Rental = require('../models/rental');
const Vhs = require('../models/vhs');

module.exports = async (req, res, next) => {
    try {
        const rentalId = req.params.id;
        
        // Kölcsönzés keresése
        const rental = await Rental.findById(rentalId);
        if (!rental) {
            throw new Error('A kölcsönzés nem található');
        }

        // Kölcsönzés frissítése
        await Rental.findByIdAndUpdate(rentalId, {
            status: 'visszahozott'
        });

        // VHS frissítése elérhetõvé
        await Vhs.findByIdAndUpdate(rental.vhsId, {
            available: true
        });

        // Átirányítás a kölcsönzések listájára
        res.redirect('/rental');
    } catch (error) {
        next(error);
    }
}; 