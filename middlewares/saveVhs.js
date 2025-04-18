const Vhs = require('../models/Vhs');

/**
 * elmenti a vhs-t az adatbazisba
 * @param objRepo
 * @returns {function(*,*,*): *}
 */
module.exports = function (objRepo) {
    return async function (req, res, next) {
        try {
            const { title, director, releaseYear, genre, available } = req.body;

            // Valid�ci�k
            if (!title || !director || !releaseYear || !genre) {
                return next(new Error('Minden mez� kit�lt�se k�telez�!'));
            }

            if (releaseYear < 1900 || releaseYear > new Date().getFullYear()) {
                return next(new Error('�rv�nytelen kiad�si �v!'));
            }

            // Ha van vhs a res.locals-ban, akkor szerkeszt�s
            if (res.locals.vhs) {
                // A megl�v� VHS friss�t�se
                const vhs = res.locals.vhs;
                vhs.title = title;
                vhs.director = director;
                vhs.releaseYear = parseInt(releaseYear);
                vhs.genre = genre;
                vhs.available = available === 'true';
                await vhs.save();
            } else {
                // �j VHS l�trehoz�sa
                const vhs = new Vhs({
                    title,
                    director,
                    releaseYear: parseInt(releaseYear),
                    genre,
                    available: available === 'true'
                });
                await vhs.save();
            }
            
            // �tir�ny�t�s a VHS list�ra
            return res.redirect('/vhs');
        } catch (err) {
            console.error('Hiba a VHS ment�sekor:', err);
            return next(err);
        }
    };
};