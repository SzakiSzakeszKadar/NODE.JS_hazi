const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routing');

// Figyelmeztetesek kezelese
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

// View engine betoltese
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Adatbazis kapcsolat
mongoose.connect('mongodb://localhost:27017/vhs_rental', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB kapcsolat sikeres');
}).catch((err) => {
    console.error('MongoDB kapcsolodasi hiba:', err);
});

// Modell betoltese
require('./models/customer');
require('./models/vhs');
require('./models/rental');

// Routing
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Hiba tortent:', err);
    res.status(500).send('Valami hiba tortent: ' + err.message);
});

// 404 handling
app.use((req, res) => {
    res.status(404).send('Az oldal nem talalhato');
});

// Szerver inditasa
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT} porton`);
});
