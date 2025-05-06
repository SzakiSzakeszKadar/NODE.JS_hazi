const Customer = require('../models/customer');

/**
 * Az összes ügyfél betöltése az adatbázisból
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    console.log('Loading all customers...');
    try {
        const customerList = await Customer.find().sort({ name: 1 });
        console.log('Found customers:', customerList.length);
        res.locals.customerList = customerList;
        return next();
    } catch (err) {
        console.error('Hiba az ügyfelek betöltésekor:', err);
        return next(err);
    }
};