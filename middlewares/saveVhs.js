const Vhs = require('../models/vhs');

/**
 * elmenti a vhs-t az adatbazisba
 * @returns {function(*,*,*): *}
 */
module.exports = async function (req, res, next) {
    try {
        console.log('VHS mentése kezdõdik:', req.body);
        const { title, director, releaseYear, genre, available } = req.body;

        if (!title || !director || !releaseYear || !genre) {
            console.error('Hiányzó kötelezõ mezõk');
            return next(new Error('Minden mezõ kitöltése kötelezõ!'));
        }

        // Évszám validáció
        const year = parseInt(releaseYear);
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            console.error('Érvénytelen évszám:', releaseYear);
            return next(new Error('Érvénytelen évszám!'));
        }

        // Available mezõ konvertálása boolean-né
        const isAvailable = available === 'true';

        if (req.params.id) {
            // Módosítás - findByIdAndUpdate használata
            console.log('VHS módosítása:', req.params.id);
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
                console.error('VHS nem található:', req.params.id);
                return next(new Error('A VHS kazetta nem található!'));
            }

            console.log('VHS sikeresen módosítva:', updatedVhs._id);
        } else {
            // Új VHS
            console.log('Új VHS létrehozása');
            const vhs = new Vhs({
                title,
                director,
                releaseYear: year,
                genre,
                available: isAvailable
            });
            await vhs.save();
            console.log('Új VHS sikeresen létrehozva:', vhs._id);
        }

        return res.redirect('/vhs');
    } catch (error) {
        console.error('Hiba a VHS kazetta mentése közben:', error);
        return next(error);
    }
};