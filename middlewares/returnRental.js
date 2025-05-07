const Rental = require('../models/rental');
const Vhs = require('../models/vhs');

module.exports = function() {
    return async function(req, res, next) {
        try {
            console.log('K�lcs�nz�s visszahoz�s kezel�se...');
            
            const rentalId = req.params.id;
            if (!rentalId) {
                throw new Error('Hi�nyz� k�lcs�nz�s azonos�t�');
            }

            // K�lcs�nz�s keres�se �s ellen�rz�se
            const rental = await Rental.findById(rentalId);
            if (!rental) {
                throw new Error('A k�lcs�nz�s nem tal�lhat�');
            }

            if (rental.status === 'visszahozott') {
                throw new Error('A k�lcs�nz�s m�r vissza lett hozva');
            }

            // VHS keres�se �s ellen�rz�se
            const vhs = await Vhs.findById(rental.vhsId);
            if (!vhs) {
                throw new Error('A VHS nem tal�lhat�');
            }

            // K�lcs�nz�s visszahozottk�nt jel�l�se
            rental.status = 'visszahozott';
            await rental.save();

            // VHS el�rhet�v� t�tele
            vhs.available = true;
            await vhs.save();

            console.log('K�lcs�nz�s sikeresen visszahozva');
            res.redirect('/rental');
        } catch (err) {
            console.error('Hiba a k�lcs�nz�s visszahoz�sa sor�n:', err);
            res.locals.error = err.message;
            res.redirect('/rental');
        }
    };
}; 