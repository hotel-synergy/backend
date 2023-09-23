const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    contact1: {
        type: String,
    },
    contact2: {
        type: String,
    },
    address: {
        type: String,
    }
})

const company = mongoose.model('company', companySchema, 'company');

module.exports = company;