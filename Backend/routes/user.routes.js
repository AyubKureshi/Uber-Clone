const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'), 
    body('fullName.firstName').isLength({min: 3}).withMessage('First name mnust be atleat 3 character long'), 
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 character long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'), 
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 character long')
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.geUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
