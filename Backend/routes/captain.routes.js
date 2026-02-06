const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'), 
    body('fullName.firstName').isLength({min: 3}).withMessage('First name mnust be atleat 3 character long'), 
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 character long'), 
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be atleast 3 character long'),
    body('vehicle.plate').isLength({min: 10}).withMessage('Plate must be atleast 10 character long'),
    body('vehicle.capacity').isLength({min: 1}).withMessage('Capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['bike', 'car', 'auto']).withMessage('Invalid vehicle type'),
], captainController.registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'), 
    body('password').isLength({min: 8}).withMessage('Password must be atleast 8 character long'), 
] ,captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
