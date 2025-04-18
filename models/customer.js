const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', {
    name: String,
    email: String,
    phone: String,
    address: String,
    membershipType: String,
    joinDate: Date,
    active: Boolean
});

module.exports = Customer;
