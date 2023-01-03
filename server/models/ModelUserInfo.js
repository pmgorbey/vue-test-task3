const {Schema, model} = require('mongoose');

const SchemaUserInfo = new Schema({
    userName: {
        type: String,
        unique: true,
        require: true
    }, 
    surName: {
        type: String,
        unique: false,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    }
});

module.exports = model('ModelUserInfo', SchemaUserInfo);

