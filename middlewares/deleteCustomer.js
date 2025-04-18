const Customer = require('../models/Customer');

/**
 * t�r�l egy �gyfelet az adatb�zisb�l �s �tir�ny�tja a felhaszn�l�t a /customer -re
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = function (objRepo) {
    return async function (req, res, next) {
        try {
            const customer = res.locals.customer;
            await Customer.findByIdAndDelete(customer._id);
            return res.redirect('/customer');
        } catch (err) {
            console.error('Hiba az �gyf�l t�rl�sekor:', err);
            return next(err);
        }
    };
};