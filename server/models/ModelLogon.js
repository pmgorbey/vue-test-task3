const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    passwordConfirm: {
        type: String,
        require: true,
        trim: true
    }
}, {timestamps: true});

const User = model('User', userSchema)

module.exports = User;