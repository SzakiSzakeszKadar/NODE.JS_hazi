const Vhs = require('../models/vhs');

/**
 * Bet�lti a VHS-t az adatb�zisb�l
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    try {
        console.log('VHS bet�lt�se kezd�dik, ID:', req.params.id);
        const vhs = await Vhs.findById(req.params.id);
        
        if (!vhs) {
            console.error('VHS nem tal�lhat�:', req.params.id);
            return res.redirect('/vhs');
        }

        console.log('VHS sikeresen bet�ltve:', vhs._id);
        res.locals.vhs = vhs;
        return next();
    } catch (error) {
        console.error('Hiba a VHS bet�lt�se k�zben:', error);
        return next(error);
    }
};