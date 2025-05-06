const Vhs = require('../models/vhs');
const Rental = require('../models/rental');

/**
 * Töröl egy VHS-t az adatbázisból és átirányítja a felhasználót a /vhs -re
 */
module.exports = async function (req, res, next) {
    try {
        console.log('VHS törlése kezdõdik, ID:', req.params.id);

        // Ellenõrizzük, hogy létezik-e a VHS
        const vhs = await Vhs.findById(req.params.id);
        if (!vhs) {
            console.error('VHS nem található:', req.params.id);
            return res.redirect('/vhs');
        }

        // Ellenõrizzük, hogy van-e aktív kölcsönzés
        const activeRentals = await Rental.find({ vhsId: req.params.id, status: 'aktív' });
        if (activeRentals.length > 0) {
            console.error('A VHS nem törölhetõ, mert aktív kölcsönzés van hozzá');
            res.locals.error = 'A VHS nem törölhetõ, mert aktív kölcsönzés van hozzá!';
            return res.redirect('/vhs');
        }

        // Töröljük a VHS-t
        await Vhs.findByIdAndDelete(req.params.id);
        console.log('VHS sikeresen törölve:', req.params.id);
        
        return res.redirect('/vhs');
    } catch (error) {
        console.error('Hiba a VHS törlése közben:', error);
        return next(error);
    }
};