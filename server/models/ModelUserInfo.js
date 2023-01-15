const {Schema, model} = require('mongoose');

const SchemaUserInfo = new Schema({
    userName: {
        type: String,
        require: true
    }, 
    surName: {
        type: String,
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

