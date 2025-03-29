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
    const objRepo = {};
    app.get('/', renderMW(objRepo)); //a kezdo pldal fog megjelenni /-re.
    app.get('/vhs', loadAllVhsMW(objRepo), renderMW(objRepo));
    app.get('/vhs/detailedview/:id', loadVhsMW(objRepo), renderMW(objRepo));
    app.get('/vhs/edit/:id', loadVhsMW(objRepo), renderMW(objRepo));

    app.get('/vhs/delete/:id', loadVhsMW(objRepo), deleteVhsMW(objRepo));
    app.get('/vhs/addnew/:id', renderMW(objRepo));

    app.get('/customer', loadAllCustomerMW(objRepo), renderMW(objRepo));
    app.get('/customer/detailedview/:id', loadCustomerMW(objRepo), renderMW(objRepo));
    app.get('/customer/edit/:id', loadCustomerMW(objRepo), renderMW(objRepo));

    app.get('/customer/delete/:id', loadCustomerMW(objRepo), deleteCustomerMW(objRepo));
    app.get('/customer/addnew/:id', renderMW(objRepo));

    app.get('/rental', loadAllRentalsMW(objRepo), renderMW(objRepo));
    app.get('/rental/addnew/:id', renderMW(objRepo));

    app.get('/rental/delete/:id', loadRentalMW(objRepo), deleteRentalMW(objRepo));

}
module.exports = subscribeToRoutes;