const Vhs = require('../models/Vhs');

/**
 * Az összes VHS kazetta betöltése az adatbázisból
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = function (objRepo) {
    return async function (req, res, next) {
        try {
            const vhsList = await Vhs.find({});
            res.locals.vhsList = vhsList;
            return next();
        } catch (err) {
            console.error('Hiba a VHS kazetták betöltésekor:', err);
            return next(err);
        }
    };
};