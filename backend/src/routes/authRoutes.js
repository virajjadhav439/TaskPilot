const express = require('express');
const { registerUser, loginUser, googleLogin } = require('../controllers/authController');
const { signupValidation } = require('../validators/authValidator');
const validate = require('../middlewares/validate');
const router = express.Router()

router.post('/signup',signupValidation,validate,registerUser)
router.post('/login',loginUser)
router.post('/google',googleLogin)


module.exports = router