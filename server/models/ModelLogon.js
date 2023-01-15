const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    passwordConfirm: {
        type: String,
        require: true
    }
}, {timestamps: true});

const User = model('User', userSchema)

module.exports = User;