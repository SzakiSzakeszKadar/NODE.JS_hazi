const Customer = require('../models/customer');
const Rental = require('../models/rental');

/**
 * töröl egy ügyfelet az adatbázisból és átirányítja a felhasználót a /customer -re
 */
module.exports = async function (req, res, next) {
    try {
        console.log('Ügyfél törlése kezdõdik, ID:', req.params.id);
        
        // Ellenõrizzük, hogy van-e aktív kölcsönzése az ügyfélnek
        const activeRentals = await Rental.find({ customerId: req.params.id, status: 'aktív' });
        
        if (activeRentals.length > 0) {
            console.error('Az ügyfél nem törölhetõ, mert van aktív kölcsönzése');
            res.locals.error = 'Az ügyfél nem törölhetõ, mert van aktív kölcsönzése!';
            return res.redirect('/customer');
        }

        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        
        if (!deletedCustomer) {
            console.error('Ügyfél nem található:', req.params.id);
            return res.redirect('/customer');
        }

        console.log('Ügyfél sikeresen törölve:', req.params.id);
        return res.redirect('/customer');
    } catch (err) {
        console.error('Hiba az ügyfél törlésekor:', err);
        return next(err);
    }
};