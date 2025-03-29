const express = require('express')
const app = express();

const loadVhsMW = require('./middlewares/loadVhs');
const loadAllVhsMW = require('./middlewares/loadAllVhs');
const deleteVhsMW = require('./middlewares/deleteVhs');
const saveVhsMW = require('./middlewares/saveVhs');

const loadCustomerMW = require('./middlewares/loadCustomer');
const loadAllCustomerMW = require('./middlewares/loadAllCustomers');
const deleteCustomerMW = require('./middlewares/deleteCustomer');
const saveCustomerMW = require('./middlewares/saveCustomer');


const loadRentalMW = require('./middlewares/loadRental');
const loadAllRentalsMW = require('./middlewares/loadAllRentals');
const deleteRentalMW = require('./middlewares/deleteRental');
const saveRentalMW = require('./middlewares/saveRental');

const renderMW = require('./middlewares/render');

const subscribeToRoutes = require('./routing/routing');
subscribeToRoutes(app);

app.use (express.static('public'));
app.listen(3000, ()  => {
    console.log("Listening on :3000");
});