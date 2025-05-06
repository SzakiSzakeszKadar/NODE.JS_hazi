const Rental = require('../models/rental');

/**
 * Az összes bérlés betöltése az adatbázisból
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
        console.error('Hiba a kölcsönzések betöltése közben:', error);
        next(error);
    }
}

module.exports = loadAllRentals;
