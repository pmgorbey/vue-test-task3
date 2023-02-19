const User = require('../models/ModelLogon');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {secret} = require('../config');
const ApiError = require('../helpers/apiErrors');

const generateAccessToken = (id) => {
    const payload = {
        id
    }

    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class Controller {
    //REGISTRATION
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Error during registration ...', errors});
            }

            const {firstName, lastName, email, password, passwordConfirm} = req.body;      
            const candidate = await User.findOne({firstName: firstName});
            if (candidate) {
                throw ApiError.BadRequest(`User with this name ${email} is already registered ... `);
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const hashPasswordConfirm = bcrypt.hashSync(passwordConfirm, 5);
            const user = new User({firstName: firstName, lastName: lastName, email: email, password: hashPassword, passwordConfirm: hashPasswordConfirm});
            await user.save();
            console.log('User is successfully registered ...');
            return res.json({message: 'User is successfully registered ...'});
            
        } catch (err) {
            next(err)
        }
    }

    //Login
    async login(req, res, next) {
        try {

            //Validation user
            const {email, password} = req.body;
            const user = await User.findOne({email: email});
            if (!user) {
                throw ApiError.BadRequest(`User with name ${email} is not found ...`);
            }

            //Validation password
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw ApiError.BadRequest(`Password is incorrect ...`);                 
            }

            //JWT 
            const token = generateAccessToken(user._id);
            // res.json(`Bearer ${token}`);  =>   then need to slit(' ')[1]    
            res.json({token, user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }});         

        } catch (err) {
            next(err);
        }
    }

    //USERS
    async getUsers(req, res, next) {
        try {
            if (req.headers.authorization == undefined) {
                throw ApiError.UnauthorizedError();
            }
            // const token = req.headers.authorization.split(' ')[1];
            const token = req.headers.authorization;
            
            if (!token) {
                throw ApiError.UnauthorizedError();
            }

            const decodedToken = jwt.verify(token, secret);
            const user = await User.findOne({_id: decodedToken.id});
            return res.status(200).send(user)

        } catch (err) {
            // res.status(403).json({message: 'User is not authorized ...'});
            next(err);
        }
    }

};

module.exports = new Controller();