const express = require('express');
const { registerUser, loginUser, sendOtp, verifyOtp, resendOtp, updatePassword } = require('../controllers/auth_controllers');
const authRouter = express.Router();

authRouter.post('/user/register', registerUser)
authRouter.post('/user/login', loginUser)
authRouter.post('/user/otp', sendOtp)
authRouter.post('/user/verifyOtp', verifyOtp)
authRouter.post('/user/resendOtp', resendOtp)
authRouter.post('/user/updatePassword', updatePassword)

module.exports = authRouter