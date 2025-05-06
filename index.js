const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routing');

// Figyelmeztet�sek kezel�se
process.on('warning', (warning) => {
    if (warning.name === 'DeprecationWarning' && warning.message.includes('punycode')) {
        return;
    }
    console.warn(warning);
});

const app = express();

// Middleware-ek
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine be�ll�t�sa
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Adatb�zis kapcsolat
mongoose.connect('mongodb://localhost:27017/vhs_rental', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB kapcsolat sikeres');
}).catch((err) => {
    console.error('MongoDB kapcsol�d�si hiba:', err);
});

// Modell bet�lt�se
require('./models/customer');
require('./models/vhs');
require('./models/rental');

// Routing
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Hiba t�rt�nt:', err);
    res.status(500).send('Valami hiba t�rt�nt: ' + err.message);
});

// 404 handling
app.use((req, res) => {
    res.status(404).send('Az oldal nem tal�lhat�');
});

// Szerver ind�t�sa
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT} porton`);
});