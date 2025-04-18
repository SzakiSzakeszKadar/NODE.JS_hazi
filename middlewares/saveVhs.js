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

            // Validációk
            if (!title || !director || !releaseYear || !genre) {
                return next(new Error('Minden mezõ kitöltése kötelezõ!'));
            }

            if (releaseYear < 1900 || releaseYear > new Date().getFullYear()) {
                return next(new Error('Érvénytelen kiadási év!'));
            }

            // Ha van vhs a res.locals-ban, akkor szerkesztés
            if (res.locals.vhs) {
                // A meglévõ VHS frissítése
                const vhs = res.locals.vhs;
                vhs.title = title;
                vhs.director = director;
                vhs.releaseYear = parseInt(releaseYear);
                vhs.genre = genre;
                vhs.available = available === 'true';
                await vhs.save();
            } else {
                // Új VHS létrehozása
                const vhs = new Vhs({
                    title,
                    director,
                    releaseYear: parseInt(releaseYear),
                    genre,
                    available: available === 'true'
                });
                await vhs.save();
            }
            
            // Átirányítás a VHS listára
            return res.redirect('/vhs');
        } catch (err) {
            console.error('Hiba a VHS mentésekor:', err);
            return next(err);
        }
    };
};