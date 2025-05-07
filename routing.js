const express = require('express');
const router = express.Router();

// Middleware-ek importálása
const loadAllRentals = require('./middlewares/loadAllRentals');
const loadRental = require('./middlewares/loadRental');
const saveRental = require('./middlewares/saveRental');
const deleteRental = require('./middlewares/deleteRental');
const returnRental = require('./middlewares/returnRental');
const loadAllCustomers = require('./middlewares/loadAllCustomers');
const loadCustomer = require('./middlewares/loadCustomer');
const saveCustomer = require('./middlewares/saveCustomer');
const deleteCustomer = require('./middlewares/deleteCustomer');
const loadAllVhs = require('./middlewares/loadAllVhs');
const loadVhs = require('./middlewares/loadVhs');
const saveVhs = require('./middlewares/saveVhs');
const deleteVhs = require('./middlewares/deleteVhs');
const render = require('./middlewares/render');

// Debug middleware
router.use((req, res, next) => {
    console.log('Routing:', req.method, req.url);
    next();
});

// Fõoldal
router.get('/', (req, res) => {
    console.log('Rendering index page');
    res.render('index');
});

// Kölcsönzések
router.get('/rental', loadAllRentals, render('rentals/rentals'));
router.get('/rental/addnew', loadAllCustomers, loadAllVhs, render('rentals/rentaladdingform'));
router.get('/rental/detailedview/:id', loadRental, render('rentals/rentaldetailedview'));
router.get('/rental/edit/:id', loadRental, loadAllCustomers, loadAllVhs, render('rentals/rentaleditform'));
router.post('/rental/save', saveRental);
router.post('/rental/save/:id', saveRental);
router.get('/rental/delete/:id', deleteRental);
router.get('/rental/return/:id', returnRental);

// Ügyfelek
router.get('/customer', loadAllCustomers, render('customers/customers'));
router.get('/customer/addnew', render('customers/customeraddingform'));
router.get('/customer/detailedview/:id', loadCustomer, render('customers/customerdetailedview'));
router.get('/customer/edit/:id', loadCustomer, render('customers/customereditform'));
router.post('/customer/save', saveCustomer);
router.post('/customer/save/:id', saveCustomer);
router.get('/customer/delete/:id', deleteCustomer);

// VHS-ek
router.get('/vhs', loadAllVhs, render('vhs/vhs'));
router.get('/vhs/addnew', render('vhs/vhsaddingform'));
router.get('/vhs/detailedview/:id', loadVhs, render('vhs/vhsdetailedview'));
router.get('/vhs/edit/:id', loadVhs, render('vhs/vhseditform'));
router.post('/vhs/save', saveVhs);
router.post('/vhs/save/:id', saveVhs);
router.get('/vhs/delete/:id', deleteVhs);

module.exports = router; 