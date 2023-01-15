const Router = require('express');
const {check} = require('express-validator');
const controller = require('../controllers/ControllerLogon');
const middlValid = require('../middleware/middlVallid');
const middlAccess = require('../middleware/middlAccess');

const router = new Router();

// router.post('/registration', 
//     // check('name', 'Імя не може бути пустим').notEmpty(),
//     // check('password', 'Password will be Between 4 And 10').isLength({min:4, max:10}),
//     controller.registration);
// router.post('/login', controller.login);


router.post('/register', controller.registration);
router.post('/login', controller.login);
router.get('/user', controller.getUsers);

module.exports = router; 