const jwt = require('jsonwebtoken');
const {secret} = require('../config');

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
   
    try {
        const token = req.headers.authorization;
        console.log(token);
        if (!token) {
            return res.status(403).json({message: 'User is not authorized '});    
        }
    
        //Розшифровуємо токен: decodedData = payload
        const decodedData = jwt.verify(token, secret);
        if (!decodedData) {
            return res.status(403).json({message: 'User is not authorized ...'});    
        }

        req.user = decodedData;
        next();

    } catch (err) {
        console.log(err);
        return res.status(403).json({message: 'User is not authorized !!!'});
        
    }
}


