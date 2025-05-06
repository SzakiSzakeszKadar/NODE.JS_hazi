const Customer = require('../models/customer');

/**
 * Egy �gyf�l bet�lt�se az adatb�zisb�l
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
async function loadCustomer(req, res, next) {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            res.locals.error = 'Az �gyf�l nem tal�lhat�!';
            return res.redirect('/customer');
        }

        res.locals.customer = customer;
        next();
    } catch (error) {
        console.error('Hiba az �gyf�l bet�lt�se k�zben:', error);
        next(error);
    }
}

module.exports = loadCustomer;