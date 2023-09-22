const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    contact: {
        type: String,
    },
    website: {
        type: String,
    },
    email: {
        type: String,
    }
})

const company = mongoose.model('company', companySchema, 'company');

module.exports = company;