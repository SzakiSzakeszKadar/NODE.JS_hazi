const errorHandler = (err, req, res, next) => {
    console.error('Hiba történt:', err);

    // Alapértelmezett hibaüzenet
    let errorMessage = 'Váratlan hiba történt!';

    // Ismert hibák kezelése
    if (err.message) {
        errorMessage = err.message;
    }

    // Validációs hibák kezelése
    if (err.name === 'ValidationError') {
        errorMessage = Object.values(err.errors)
            .map(error => error.message)
            .join(', ');
    }

    // Az aktuális útvonal alapján határozzuk meg a visszairányítást
    let redirectPath = '/';
    if (req.path.startsWith('/rental')) redirectPath = '/rental';
    if (req.path.startsWith('/customer')) redirectPath = '/customer';
    if (req.path.startsWith('/vhs')) redirectPath = '/vhs';

    // Hibaüzenet tárolása és átirányítás
    res.locals.error = errorMessage;
    res.redirect(redirectPath);
};

module.exports = errorHandler; 