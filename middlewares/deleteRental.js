const Rental = require('../models/rental');
const Vhs = require('../models/vhs');

/**
 * t�r�l egy b�rl�st az adatb�zisb�l �s friss�ti a VHS el�rhet�s�g�t
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
async function deleteRental(req, res, next) {
    try {
        const rental = await Rental.findById(req.params.id).populate('vhsId');
        if (!rental) {
            return res.redirect('/rental');
        }

        await Vhs.findByIdAndUpdate(rental.vhsId._id, { available: true });
        await Rental.findByIdAndDelete(req.params.id);

        res.redirect('/rental');
    } catch (error) {
        console.error('Hiba a k�lcs�nz�s t�rl�se k�zben:', error);
        next(error);
    }
}

module.exports = deleteRental;