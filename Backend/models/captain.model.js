const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String, 
            required: true,
            minLength: [3, 'First name must be atleat 3 character long'], 
        }, 
        lastName: {
            type: String, 
            minLength: [3, 'Last name must be atleat 3 character long'], 
        }, 
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    }, 
    password: {
        type: String, 
        required: true, 
        select: false, 
    }, 
    socketId: {
        type: String, 
    }, 
    status: {
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'inactive'
    }, 
    vehicle: {
        color: {
            type: String, 
            required: true, 
            minLength: [3, 'Color must be atleast 3 character long']
        }, 
        plate: {
            type: String, 
            required: true, 
            minLength: [10, 'Plate number must be atleast 10 character long']
        }, 
        capacity: {
            type: Number, 
            required: true, 
            minLength: [1, 'Capacity must be atleast 1']
        }, 
        vehicleType: {
            type: String, 
            required: true, 
            enum: ['bike', 'car', 'auto'], 
        }, 
    }, 
    location: {
        lat: {
            type: Number, 
        }, 
        lng: {
            type: Number, 
        }, 
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
};

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
}


module.exports = mongoose.model('Captain', captainSchema);
