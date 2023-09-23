const express = require('express');
const setupRouter = express.Router();

const {setupAdminAndCompany, getSetupStatus} = require('../../controllers/v1/setup/setup');
setupRouter.get('/',  getSetupStatus)
setupRouter.post('/', setupAdminAndCompany);


module.exports = setupRouter