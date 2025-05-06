const Rental = require('../models/rental');
const Vhs = require('../models/vhs');

/**
 * töröl egy bérlést az adatbázisból és frissíti a VHS elérhetõségét
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
        console.error('Hiba a kölcsönzés törlése közben:', error);
        next(error);
    }
}

module.exports = deleteRental;