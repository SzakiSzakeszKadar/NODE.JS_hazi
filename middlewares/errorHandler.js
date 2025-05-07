const errorHandler = (err, req, res, next) => {
    console.error('Hiba t�rt�nt:', err);

    // Alap�rtelmezett hiba�zenet
    let errorMessage = 'V�ratlan hiba t�rt�nt!';

    // Ismert hib�k kezel�se
    if (err.message) {
        errorMessage = err.message;
    }

    // Valid�ci�s hib�k kezel�se
    if (err.name === 'ValidationError') {
        errorMessage = Object.values(err.errors)
            .map(error => error.message)
            .join(', ');
    }

    // Az aktu�lis �tvonal alapj�n hat�rozzuk meg a visszair�ny�t�st
    let redirectPath = '/';
    if (req.path.startsWith('/rental')) redirectPath = '/rental';
    if (req.path.startsWith('/customer')) redirectPath = '/customer';
    if (req.path.startsWith('/vhs')) redirectPath = '/vhs';

    // Hiba�zenet t�rol�sa �s �tir�ny�t�s
    res.locals.error = errorMessage;
    res.redirect(redirectPath);
};

module.exports = errorHandler; 