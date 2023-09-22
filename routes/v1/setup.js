const express = require('express');
const setupRouter = express.Router();

const setupAdminAndCompany = require('../../controllers/v1/setup/setup');
setupRouter.post('/', setupAdminAndCompany);


module.exports = setupRouter