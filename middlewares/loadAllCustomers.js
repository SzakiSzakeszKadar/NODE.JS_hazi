const Customer = require('../models/customer');

/**
 * Az �sszes �gyf�l bet�lt�se az adatb�zisb�l
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
        console.error('Hiba az �gyfelek bet�lt�sekor:', err);
        return next(err);
    }
};