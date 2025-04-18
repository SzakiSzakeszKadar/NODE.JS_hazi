const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// UTF-8 be�ll�t�sok
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ charset: 'utf-8' }));
app.set('view engine', 'ejs');

// Adatb�zis kapcsolat
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/OCAYIY')
    .then(() => console.log('MongoDB kapcsolat l�trej�tt'))
    .catch(err => console.error('MongoDB kapcsol�d�si hiba:', err));

// Modell bet�lt�se
require('./models/Customer');
require('./models/Vhs');
require('./models/Rental');

// �tvonalak be�ll�t�sa
const subscribeToRoutes = require('./routing/routing.js');
subscribeToRoutes(app);

// Szerver ind�t�sa
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Szerver fut a k�vetkez� porton: ${port}`);
});