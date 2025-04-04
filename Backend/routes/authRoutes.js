const express = require('express');
const { register, login, verifyOTP, resendOPT, requestPasswordReset,resetPassword, requestProfile } = require('../controllers/authController');
 
const router = express.Router();
 
router.post('/register', register);
router.post('/login', login);
router.post('/register-complete', verifyOTP);
router.post('/regenerate-otp', resendOPT);
router.post('/request-password-reset', requestPasswordReset)
router.post('/reset-password', resetPassword)
router.get('/profile/:id', requestProfile)
 
module.exports = router;