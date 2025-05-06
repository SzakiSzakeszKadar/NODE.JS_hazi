const Vhs = require('../models/vhs');

/**
 * Betölti a VHS-t az adatbázisból
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    try {
        console.log('VHS betöltése kezdõdik, ID:', req.params.id);
        const vhs = await Vhs.findById(req.params.id);
        
        if (!vhs) {
            console.error('VHS nem található:', req.params.id);
            return res.redirect('/vhs');
        }

        console.log('VHS sikeresen betöltve:', vhs._id);
        res.locals.vhs = vhs;
        return next();
    } catch (error) {
        console.error('Hiba a VHS betöltése közben:', error);
        return next(error);
    }
};