const Vhs = require('../models/Vhs');

/**
 * torlok egy VHS-t az adatbazisbol es atiranyitja a usert a /vhs -re
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = function (objRepo) {
    return async function (req, res, next) {
        try {
            const vhs = res.locals.vhs;
            await Vhs.findByIdAndDelete(vhs._id);
            return res.redirect('/vhs');
        } catch (err) {
            console.error('Hiba a VHS törlésekor:', err);
            return next(err);
        }
    };
};