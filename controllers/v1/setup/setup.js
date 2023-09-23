const express = require('express');
const company = require('../../../models/Company');
const User = require('../../../models/User');
const validateEmail = require('../../../utils/validateEmail');
const { SendEmailVerificationLink } = require('../../../utils/sendemail');
const setupRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const setupAdminAndCompany = async (req, res) => {

/*
username, email, password, fullName for the admin account
companyname, for the company now.(TODO: add something later on.)
*/

    try {
        // see if there is a company config already.
        prevCompany = await company.findOne({});
        if (prevCompany) {
            return res.status(400).json({ msg: 'The software is already configured and can not be reconfigured.' });
        }
        const { companyName, fullName, email, password } = req.body;
        if (!companyName || !fullName || !email || !password || !username) {
            return res.status(400).json({msg: 'Please provide all the information to complete the setup.'})
        }
        
        //see if the provided email is valid.
        const isEmailValid = validateEmail(email);
        if (!isEmailValid) {
            return res.status(400).json({msg: 'Please provide a valid email address.'})
        }

        //creating a new company.
        const newCompany = await new company({
            name: companyName
        })

        //hash the password 
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));

        //creating new user
        const newUser = await new User({
            fullName,
            password: hashedPassword,
            email,
            role: 'admin',
            verified: false,
        })
        
        //send verification email
        const newEmailVerificationToken = await jwt.sign({
            email: newUser.email,
            _id: newUser._id
        }, process.env.JWT_SECRET.toString(), {
            expiresIn: '1h',
            algorithm: 'HS256'
        });
        const isEmailSent = await SendEmailVerificationLink(newEmailVerificationToken, email, fullName);
        if (!isEmailSent) {
            return res.status(500).json({msg: 'There was an error sending verification link to your email.'})
        }
        
        //save these
        await newUser.save();
        await newCompany.save();

        //return the success response.
        return res.status(200).json({ msg: 'Setup successful, please proceed to login.' })
    
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry, an internal server error while saving company information.'})
    }
}

const getSetupStatus = async (req, res) => {
    try {
        const companyList = await company.find({});
        if (companyList.length == 0) {
            return res.status(200).json({ msg: 'Software needs to be configured.'});
        } else res.status(400).json({msg: 'Software already configured.'});
    } catch (err) {
        res.status(500).json({msg: 'Unknown server error'})
    }
}

module.exports = {setupAdminAndCompany, getSetupStatus};