const {Schema, model} = require('mongoose');

const SchemaUserInfo = new Schema({
    userName: {
        type: String,
        require: true,
        trim: true
    }, 
    surName: {
        type: String,
        require: true,
        trim: true 
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        require: true,
        trim: true
    }
});

module.exports = model('ModelUserInfo', SchemaUserInfo);

