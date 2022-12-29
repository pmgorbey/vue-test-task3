const {Schema, model} = require('mongoose');

const roleSchema = new Schema({
    value: {
        type: String, 
        default: 'USER'
    }
}, {timestamps: true});

const Role = model('Role', roleSchema);

module.exports = Role;