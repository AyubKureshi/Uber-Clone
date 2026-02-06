const Captain = require('../models/captain.model');
const BlacklistToken = require('../models/blacklistToken.model')
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await Captain.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashedPassword = await Captain.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstName: fullName.firstName, 
        lastName: fullName.lastName, 
        email, 
        password: hashedPassword, 
        color: vehicle.color, 
        plate: vehicle.plate, 
        capacity: vehicle.capacity, 
        vehicleType: vehicle.vehicleType, 
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token, captain}); 
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await Captain.findOne({ email }).select('+password');

    if(!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await captain.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ captain, token });
} 

module.exports.getCaptainProfile = (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({message: "Logout successfully"});
}
