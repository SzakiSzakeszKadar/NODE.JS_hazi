const Rental = require('../models/rental');

/**
 * Egy b�rl�s bet�lt�se az adatb�zisb�l
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
async function loadRental(req, res, next) {
    try {
        const rental = await Rental.findById(req.params.id)
            .populate('customerId', 'name')
            .populate('vhsId', 'title');

        if (!rental) {
            return res.redirect('/rental');
        }

        res.locals.rental = {
            _id: rental._id,
            customerId: rental.customerId._id,
            customerName: rental.customerId.name,
            vhsId: rental.vhsId._id,
            vhsTitle: rental.vhsId.title,
            rentalDate: rental.rentalDate,
            returnDate: rental.returnDate,
            status: rental.status
        };

        next();
    } catch (error) {
        console.error('Hiba a k�lcs�nz�s bet�lt�se k�zben:', error);
        next(error);
    }
}

module.exports = loadRental;