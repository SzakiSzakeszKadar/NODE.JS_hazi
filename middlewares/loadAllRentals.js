const Rental = require('../models/rental');

/**
 * Az �sszes b�rl�s bet�lt�se az adatb�zisb�l
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
async function loadAllRentals(req, res, next) {
    try {
        const rentalList = await Rental.find({})
            .populate('customerId', 'name')
            .populate('vhsId', 'title')
            .sort({ rentalDate: -1 });

        res.locals.rentalList = rentalList.map(rental => ({
            _id: rental._id,
            customerName: rental.customerId.name,
            vhsTitle: rental.vhsId.title,
            rentalDate: rental.rentalDate,
            returnDate: rental.returnDate,
            status: rental.status
        }));

        next();
    } catch (error) {
        console.error('Hiba a k�lcs�nz�sek bet�lt�se k�zben:', error);
        next(error);
    }
}

module.exports = loadAllRentals;
