const {Schema, model} = require('mongoose');

const SchemaUserProfile = new Schema({
    userName: {
        type: String,
        unique: false,
        require: true
    }, 
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    }
});

module.exports = model('ModelUserProfile', SchemaUserProfile);

