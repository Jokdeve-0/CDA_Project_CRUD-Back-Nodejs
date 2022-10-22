const express = require('express');
const router = express.Router()

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const { uniqueCheck } = require('../middleware/authUnique');
const { encryptedPassword } = require('../middleware/bcrypt');


// router.post('/signup',uniqueCheck,encryptedPassword, userController.addEntity);

// router.post('/login',authController.login);

module.exports = router