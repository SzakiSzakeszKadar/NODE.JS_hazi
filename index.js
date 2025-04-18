const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// UTF-8 beállítások
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ charset: 'utf-8' }));
app.set('view engine', 'ejs');

// Adatbázis kapcsolat
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/OCAYIY')
    .then(() => console.log('MongoDB kapcsolat létrejött'))
    .catch(err => console.error('MongoDB kapcsolódási hiba:', err));

// Modell betöltése
require('./models/Customer');
require('./models/Vhs');
require('./models/Rental');

// Útvonalak beállítása
const subscribeToRoutes = require('./routing/routing.js');
subscribeToRoutes(app);

// Szerver indítása
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Szerver fut a következõ porton: ${port}`);
});