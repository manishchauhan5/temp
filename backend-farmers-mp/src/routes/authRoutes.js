const express = require('express');
const { registerController, loginController, requestPasswordReset, verifyOTP, setNewPassword,  } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/reset-password', requestPasswordReset); // Send OTP

router.post('/reset-password/verify', verifyOTP); // Verify OTP and reset password

router.post('/reset-password/new-password', setNewPassword); // set new password

module.exports = router; 