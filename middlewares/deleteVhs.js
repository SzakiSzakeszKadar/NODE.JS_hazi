const Vhs = require('../models/vhs');
const Rental = require('../models/rental');

/**
 * T�r�l egy VHS-t az adatb�zisb�l �s �tir�ny�tja a felhaszn�l�t a /vhs -re
 */
module.exports = async function (req, res, next) {
    try {
        console.log('VHS t�rl�se kezd�dik, ID:', req.params.id);

        // Ellen�rizz�k, hogy l�tezik-e a VHS
        const vhs = await Vhs.findById(req.params.id);
        if (!vhs) {
            console.error('VHS nem tal�lhat�:', req.params.id);
            return res.redirect('/vhs');
        }

        // Ellen�rizz�k, hogy van-e akt�v k�lcs�nz�s
        const activeRentals = await Rental.find({ vhsId: req.params.id, status: 'akt�v' });
        if (activeRentals.length > 0) {
            console.error('A VHS nem t�r�lhet�, mert akt�v k�lcs�nz�s van hozz�');
            res.locals.error = 'A VHS nem t�r�lhet�, mert akt�v k�lcs�nz�s van hozz�!';
            return res.redirect('/vhs');
        }

        // T�r�lj�k a VHS-t
        await Vhs.findByIdAndDelete(req.params.id);
        console.log('VHS sikeresen t�r�lve:', req.params.id);
        
        return res.redirect('/vhs');
    } catch (error) {
        console.error('Hiba a VHS t�rl�se k�zben:', error);
        return next(error);
    }
};