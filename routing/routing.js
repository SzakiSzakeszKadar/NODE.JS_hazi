const loadVhsMW = require('../middlewares/loadVhs');
const loadAllVhsMW = require('../middlewares/loadAllVhs');
const deleteVhsMW = require('../middlewares/deleteVhs');
const saveVhsMW = require('../middlewares/saveVhs');

const loadCustomerMW = require('../middlewares/loadCustomer');
const loadAllCustomerMW = require('../middlewares/loadAllCustomers');
const deleteCustomerMW = require('../middlewares/deleteCustomer');
const saveCustomerMW = require('../middlewares/saveCustomer');


const loadRentalMW = require('../middlewares/loadRental');
const loadAllRentalsMW = require('../middlewares/loadAllRentals');
const deleteRentalMW = require('../middlewares/deleteRental');
const saveRentalMW = require('../middlewares/saveRental');

const renderMW = require('../middlewares/render');
const {render} = require("express/lib/application");

function subscribeToRoutes(app){
    const objRepo = {
    };

    app.get('/', renderMW(objRepo, 'index.ejs'));

    app.get('/vhs', loadAllVhsMW(objRepo), renderMW(objRepo, 'vhs/vhs.ejs'));
    app.get('/vhs/detailedview/:id', loadVhsMW(objRepo), renderMW(objRepo, 'vhs/vhsdetailedview.ejs'));

    app.get('/vhs/edit/:id', loadVhsMW(objRepo), renderMW(objRepo,'vhs/vhseditform.ejs'));
    app.post('/vhs/edit/:id', loadVhsMW(objRepo), saveVhsMW(objRepo));

    app.get('/vhs/delete/:id', loadVhsMW(objRepo), deleteVhsMW(objRepo));

    app.get('/vhs/addnew', renderMW(objRepo, 'vhs/vhsaddingform.ejs'));
    app.post('/vhs/save', saveVhsMW(objRepo));

    app.get('/customer', loadAllCustomerMW(objRepo), renderMW(objRepo, 'customers/customers.ejs'));

    app.get('/customer/detailedview/:id', loadCustomerMW(objRepo), renderMW(objRepo, 'customers/customerdetailedview.ejs'));

    app.get('/customer/edit/:id', loadCustomerMW(objRepo), renderMW(objRepo, 'customers/customereditform.ejs'));
    app.post('/customer/edit/:id', loadCustomerMW(objRepo), saveCustomerMW(objRepo));

    app.get('/customer/delete/:id', loadCustomerMW(objRepo), deleteCustomerMW(objRepo));

    app.get('/customer/addnew', renderMW(objRepo, 'customers/customeraddingform.ejs'));
    app.post('/customer/save', saveCustomerMW(objRepo));

    app.get('/rental', loadAllRentalsMW(objRepo), renderMW(objRepo, 'rentals/rentals.ejs'));

    app.get('/rental/addnew', renderMW(objRepo, 'rentals/rentaladdingform.ejs'));
    app.post('/rental/save', saveRentalMW(objRepo));

    app.get('/rental/delete/:id', loadRentalMW(objRepo), deleteRentalMW(objRepo));
}
module.exports = subscribeToRoutes;