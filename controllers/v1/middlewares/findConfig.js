const company = require("../../../models/Company");

//checks if the configuration exists and to process the request or not.
const checkConfig = async (req, res, next) => {
    const companyData = await company.findOne({});
    if (companyData) {
        //config found process the request
        next();
    } else {
        //no configuration stop the request.
        return res.status(400).json({msg: 'The software needs to be configured before being used.'})
    }
}

module.exports = checkConfig;