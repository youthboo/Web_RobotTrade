const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    IDcard: { type: String, required: true },
    port: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false } 
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: '7d'})
    return token
}

const User = mongoose.model('user', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        IDcard: Joi.string().required().label('ID Card'),
        port: Joi.string().required().label('Port Number'),
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(8).max(255).required().label('Password'),
    });
    return schema.validate(data);
}

module.exports = { User, validate };