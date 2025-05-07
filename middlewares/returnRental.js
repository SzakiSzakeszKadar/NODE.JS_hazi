const Rental = require('../models/rental');
const Vhs = require('../models/vhs');

module.exports = function() {
    return async function(req, res, next) {
        try {
            console.log('Kölcsönzés visszahozás kezelése...');
            
            const rentalId = req.params.id;
            if (!rentalId) {
                throw new Error('Hiányzó kölcsönzés azonosító');
            }

            // Kölcsönzés keresése és ellenõrzése
            const rental = await Rental.findById(rentalId);
            if (!rental) {
                throw new Error('A kölcsönzés nem található');
            }

            if (rental.status === 'visszahozott') {
                throw new Error('A kölcsönzés már vissza lett hozva');
            }

            // VHS keresése és ellenõrzése
            const vhs = await Vhs.findById(rental.vhsId);
            if (!vhs) {
                throw new Error('A VHS nem található');
            }

            // Kölcsönzés visszahozottként jelölése
            rental.status = 'visszahozott';
            await rental.save();

            // VHS elérhetõvé tétele
            vhs.available = true;
            await vhs.save();

            console.log('Kölcsönzés sikeresen visszahozva');
            res.redirect('/rental');
        } catch (err) {
            console.error('Hiba a kölcsönzés visszahozása során:', err);
            res.locals.error = err.message;
            res.redirect('/rental');
        }
    };
}; 