const Vhs = require('../models/Vhs');

/**
  * egy vhs betoltese az adatbazisbol, vhs db-bol ki ha nem letezik redirect /vhs-re, egyebkent next hivas
  * @param objRepo
  * @returns {function(*,*,*): *}
*/
module.exports = (objRepo) => {
    return async (req, res, next) => {
        try {
            const vhs = await Vhs.findById(req.params.id);
            
            if (!vhs) {
                return res.redirect('/vhs');
            }
            
            res.locals.vhs = vhs;
            return next();
        } catch (err) {
            console.error('Hiba a VHS betöltésekor:', err);
            return res.redirect('/vhs');
        }
    }
}