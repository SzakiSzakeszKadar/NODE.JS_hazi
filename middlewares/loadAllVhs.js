const Vhs = require('../models/Vhs');

/**
 * Az �sszes VHS kazetta bet�lt�se az adatb�zisb�l
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
            console.error('Hiba a VHS kazett�k bet�lt�sekor:', err);
            return next(err);
        }
    };
};