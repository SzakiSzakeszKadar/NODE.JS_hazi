const Customer = require('../models/customer');

/**
 * Egy ügyfél betöltése az adatbázisból
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
async function loadCustomer(req, res, next) {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            res.locals.error = 'Az ügyfél nem található!';
            return res.redirect('/customer');
        }

        res.locals.customer = customer;
        next();
    } catch (error) {
        console.error('Hiba az ügyfél betöltése közben:', error);
        next(error);
    }
}

module.exports = loadCustomer;