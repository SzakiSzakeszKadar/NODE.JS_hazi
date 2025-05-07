const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Middleware-ek importálása
const loadAllVhsMW = require('../middlewares/loadAllVhs');
const loadVhsMW = require('../middlewares/loadVhs');
const saveVhsMW = require('../middlewares/saveVhs');
const deleteVhsMW = require('../middlewares/deleteVhs');
const renderMW = require('../middlewares/render');

const loadAllCustomerMW = require('../middlewares/loadAllCustomers');
const loadCustomerMW = require('../middlewares/loadCustomer');
const saveCustomerMW = require('../middlewares/saveCustomer');
const deleteCustomerMW = require('../middlewares/deleteCustomer');

const loadAllRentalsMW = require('../middlewares/loadAllRentals');
const loadRentalMW = require('../middlewares/loadRental');
const saveRentalMW = require('../middlewares/saveRental');
const deleteRentalMW = require('../middlewares/deleteRental');
const returnRentalMW = require('../middlewares/returnRental');

module.exports = function (app) {
    const objRepo = {
        Vhs: require('../models/vhs'),
        Customer: require('../models/customer'),
        Rental: require('../models/rental')
    };

    // VHS útvonalak
    app.get('/vhs', loadAllVhsMW(objRepo), renderMW(objRepo, 'vhs/vhs'));
    app.get('/vhs/addnew', renderMW(objRepo, 'vhs/vhsaddingform'));
    app.post('/vhs/save', saveVhsMW(objRepo));
    app.get('/vhs/delete/:id', loadVhsMW(objRepo), deleteVhsMW(objRepo));

    // Ügyfél útvonalak
    app.get('/customer', loadAllCustomerMW(objRepo), renderMW(objRepo, 'customers/customers'));
    app.get('/customer/detailedview/:id', loadCustomerMW(objRepo), renderMW(objRepo, 'customers/customerdetailedview'));
    app.get('/customer/edit/:id', loadCustomerMW(objRepo), renderMW(objRepo, 'customers/customereditform'));
    app.post('/customer/edit/:id', loadCustomerMW(objRepo), saveCustomerMW(objRepo));
    app.get('/customer/delete/:id', loadCustomerMW(objRepo), deleteCustomerMW(objRepo));
    app.get('/customer/addnew', renderMW(objRepo, 'customers/customeraddingform'));
    app.post('/customer/save', saveCustomerMW(objRepo));

    // Kölcsönzés útvonalak
    app.get('/rental', loadAllRentalsMW(objRepo), renderMW(objRepo, 'rentals/rentals.ejs'));
    app.get('/rental/detailedview/:id', loadRentalMW(objRepo), renderMW(objRepo, 'rentals/rentaldetailedview.ejs'));
    app.get('/rental/edit/:id', loadRentalMW(objRepo), renderMW(objRepo, 'rentals/rentaleditform.ejs'));
    app.post('/rental/edit/:id', loadRentalMW(objRepo), saveRentalMW(objRepo));
    app.get('/rental/addnew', loadAllCustomerMW(objRepo), loadAllVhsMW(objRepo), renderMW(objRepo, 'rentals/rentaladdingform.ejs'));
    app.post('/rental/save', saveRentalMW(objRepo));
    app.get('/rental/delete/:id', loadRentalMW(objRepo), deleteRentalMW(objRepo));
    app.get('/rental/return/:id', loadRentalMW(objRepo), returnRentalMW(objRepo));

    // Fõoldal
    app.get('/', (req, res) => {
        res.render('index');
    });
};