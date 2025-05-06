const Vhs = require('../models/vhs');

/**
 * elmenti a vhs-t az adatbazisba
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    try {
        console.log('VHS ment�se kezd�dik:', req.body);
        const { title, director, releaseYear, genre, available } = req.body;

        if (!title || !director || !releaseYear || !genre) {
            console.error('Hi�nyz� k�telez� mez�k');
            return next(new Error('Minden mez� kit�lt�se k�telez�!'));
        }

        // �vsz�m valid�ci�
        const year = parseInt(releaseYear);
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            console.error('�rv�nytelen �vsz�m:', releaseYear);
            return next(new Error('�rv�nytelen �vsz�m!'));
        }

        // Available mez� konvert�l�sa boolean-n�
        const isAvailable = available === 'true';

        if (req.params.id) {
            // M�dos�t�s - findByIdAndUpdate haszn�lata
            console.log('VHS m�dos�t�sa:', req.params.id);
            const updatedVhs = await Vhs.findByIdAndUpdate(
                req.params.id,
                {
                    title,
                    director,
                    releaseYear: year,
                    genre,
                    available: isAvailable
                },
                { new: true }
            );

            if (!updatedVhs) {
                console.error('VHS nem tal�lhat�:', req.params.id);
                return next(new Error('A VHS kazetta nem tal�lhat�!'));
            }

            console.log('VHS sikeresen m�dos�tva:', updatedVhs._id);
        } else {
            // �j VHS
            console.log('�j VHS l�trehoz�sa');
            const vhs = new Vhs({
                title,
                director,
                releaseYear: year,
                genre,
                available: isAvailable
            });
            await vhs.save();
            console.log('�j VHS sikeresen l�trehozva:', vhs._id);
        }

        return res.redirect('/vhs');
    } catch (error) {
        console.error('Hiba a VHS kazetta ment�se k�zben:', error);
        return next(error);
    }
};