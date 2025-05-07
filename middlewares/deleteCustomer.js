const Customer = require('../models/customer');
const Rental = require('../models/rental');

/**
 * t�r�l egy �gyfelet az adatb�zisb�l �s �tir�ny�tja a felhaszn�l�t a /customer -re
 */
module.exports = async function (req, res, next) {
    try {
        console.log('�gyf�l t�rl�se kezd�dik, ID:', req.params.id);

        const activeRentals = await Rental.find({ customerId: req.params.id, status: 'akt�v' });

        if (activeRentals.length > 0) {
            console.error('Az �gyf�l nem t�r�lhet�, mert van akt�v k�lcs�nz�se');
            res.locals.error = 'Az �gyf�l nem t�r�lhet�, mert van akt�v k�lcs�nz�se!';
            return res.redirect('/customer');
        }

        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

        if (!deletedCustomer) {
            console.error('�gyf�l nem tal�lhat�:', req.params.id);
            return res.redirect('/customer');
        }

        console.log('�gyf�l sikeresen t�r�lve:', req.params.id);
        return res.redirect('/customer');
    } catch (err) {
        console.error('Hiba az �gyf�l t�rl�sekor:', err);
        return next(err);
    }
};
