const Customer = require('../models/Customer');

/**
 * töröl egy ügyfelet az adatbázisból és átirányítja a felhasználót a /customer -re
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
            console.error('Hiba az ügyfél törlésekor:', err);
            return next(err);
        }
    };
};