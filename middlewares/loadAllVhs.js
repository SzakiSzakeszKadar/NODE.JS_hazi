const Vhs = require('../models/vhs');

/**
 * Az összes VHS kazetta betöltése az adatbázisból
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    console.log('Loading all VHS tapes...');
    try {
        const vhsList = await Vhs.find().sort({ title: 1 });
        console.log('Found VHS tapes:', vhsList.length);
        res.locals.vhsList = vhsList;
        return next();
    } catch (error) {
        console.error('Hiba a VHS-ek betöltése közben:', error);
        return next(error);
    }
};