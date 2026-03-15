const { signup, login } = require('../Controllers/authController');
const { signUpValidation, loginValidation } = require('../Middlewares/authValidation');

const express = require("express");
const router = express.Router();



router.post('/login',loginValidation,login);
router.post('/signup',signUpValidation,signup);


module.exports=router;