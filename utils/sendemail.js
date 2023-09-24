const { urlencoded } = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    host: process.env.HOTEL_EMAIL_HOST.toString(),
    port: 465,
    secure: true,
    auth: {
        user: process.env.HOTEL_SOFTWARE_EMAIL.toString(),
        pass: process.env.HOTEL_EMAIL_PASSWORD.toString(),
    }
});

const SendPasswordResetEmail = async (link_token, email, name = 'user') => {
    //sending password reset email
    const mailOptions = {
        from: process.env.HOTEL_SOFTWARE_EMAIL.toString(),
        to: email,
        subject: `Reset password - ${process.env.HOTEL_NAME.toString()}`,
        html: `
        <p>Hello, <strong>${name}</strong>!</p><p>Someone requested to reset your password for ${process.env.HOTEL_NAME.toString()} account.
         If it is you, please visit the link below if this isn't you please ignore thi and make sure to keep a secure password on your account.</p><a href="http://${process.env.FRONTEND_URL.toString()}/auth/resetPassword?token=${link_token}"> Click here to reset password </a><br/>Cheers!<br/>${process.env.HOTEL_NAME.toString()} team <p><em>Powered by <a href="https://www.hotel-synergy.net/">Hotel Synergy</a></em></p>
        `
    }

    try {
        await transporter.sendMail(mailOptions);
        return true
    } catch (err) {
        console.log(err);
        return false
    }
}

const SendEmailVerificationLink = async (link_token, email, name) => {
    //sending email verification 
    const mailOptions = {
        from: process.env.HOTEL_SOFTWARE_EMAIL.toString(),
        to: email,
        subject: `Verify your email address - ${process.env.HOTEL_NAME.toString()}`,
        html: `<p>Hello, <strong>${name}</strong>! <p>Welcome to ${process.env.HOTEL_NAME.toString()}. You have received this email because either you or your admin added a new account with this email to the system.<br/>Please click the link below to confirm your email address, if you think you were not supposed to receive this email, please leave it. </p>
        <a href="http://${process.env.FRONTEND_URL.toString()}/auth/verifyEmail?token=${link_token}">Click here to verify your email</a><br/><br/>
         <p>If you can not click the link above please copy and paste the following link:<br/><a href="https://${process.env.FRONTEND_URL.toString()}/auth/verifyEmail?token=${link_token}">https://${process.env.FRONTEND_URL.toString()}/auth/verifyEmail?token=${link_token}</a></p>
        Cheers!<br/>
        ${process.env.HOTEL_NAME.toString()} Team
        <p>Powered by <a href="https://www.hotel-synergy.net/">Hotel Synergy</a></p>
        `
    }

    try {
        const mailResult = await transporter.sendMail(mailOptions);
        return true
    } catch (err) {
        return false
    }
}

module.exports = { SendEmailVerificationLink, SendPasswordResetEmail }