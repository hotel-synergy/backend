const express = require('express');
const { loginUser, getLoginUserList, resetUserPassword, setNewPasswordAfterReset } = require('../../controllers/v1/auth/auth');
const authRouter = express.Router();

// request to login with user credentials
authRouter.post('/login', loginUser);

// request for a password reset link
authRouter.post('/reset', resetUserPassword);

// validate the token sent via email and set new password
authRouter.put('/reset', setNewPasswordAfterReset);



module.exports = authRouter;