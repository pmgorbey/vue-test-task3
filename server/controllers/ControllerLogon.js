const User = require('../models/ModelLogon');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const {secret} = require('../config');

const generateAccessToken = (id) => {
    const payload = {
        id
    }

    return jwt.sign(payload, secret, {expiresIn: '24h'});
}

class Controller {
    //REGISTRATION
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('Error during registration ...');
                return res.status(400).json({message: 'Error during registration ...', errors});
            }

            const {firstName, lastName, email, password, passwordConfirm} = req.body;   
            // console.log(req.body);         
            const candidate = await User.findOne({firstName: firstName});
            if (candidate) {
                console.log('User with this name is already registered ... ');
                return res.status(400).json({message: 'User with this name is already registered ... '});
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const hashPasswordConfirm = bcrypt.hashSync(passwordConfirm, 5);
            const user = new User({firstName: firstName, lastName: lastName, email: email, password: hashPassword, passwordConfirm: hashPasswordConfirm});
            await user.save();
            console.log('User is successfully registered ...');
            return res.json({message: 'User is successfully registered ...'});
            // res.redirect('/');

        } catch (err) {
            console.log('Registration error ...');
            res.status(400).json({message: 'Registration error ...'});
        }
    }


    //Login
    async login(req, res) {
        try {
            const {email, password} = req.body;
            // console.log(req.body); 
            const user = await User.findOne({email: email});
            if (!user) {
                console.log(`User with name ${email} is not found ...`);
                return res.status(400).json({message: `User with name ${email} is not found ...`});
            }

            //Validation password
            const validPassword = bcrypt.compareSync(password, user.password);
            
            if (!validPassword) {
                console.log(`Password is incorrect ...`);
                return res.status(400).json({message: `Password is incorrect ...`});
                 
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
            console.log('Login error ... ');
            res.status(400).json({message: 'Login error ... '});
        }
    }

    //USERS
    async getUsers(req, res) {
        try {
            if (req.headers.authorization == undefined) {
                console.log('User is not authorized, token failed ...');
                return res.status(403).json({message: 'User is not authorized, token failed ...'});
            }
            console.log(req.headers.authorization);
            // const token = req.headers.authorization.split(' ')[1];
            const token = req.headers.authorization;
            
            if (!token) {
                console.log('User is not authorized, token failed ...');
                return res.status(403).json({message: 'User is not authorized, token failed ...'});
            }

            const decodedToken = jwt.verify(token, secret);
            console.log(decodedToken);

            const user = await User.findOne({_id: decodedToken.id});
            console.log(user);
            return res.status(200).send(user)

        } catch (err) {
            console.log(err);
            console.log('User is not authorized ...');
            res.status(403).json({message: 'User is not authorized ...'});
        }
    }

};

module.exports = new Controller();