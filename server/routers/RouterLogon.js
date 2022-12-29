const Router = require('express');
const {check} = require('express-validator');
const controller = require('../controllers/ControllerLogon');
const middlValid = require('../middleware/middlVallid');
const middlAccess = require('../middleware/middlAccess');


const router = new Router();

// router.get('/', middlValid, controller.getHome);

// router.get('/registration', controller.getRegistration);
router.post('/registration', 
    // check('name', 'Імя не може бути пустим').notEmpty(),
    // check('password', 'Password will be Between 4 And 10').isLength({min:4, max:10}),
    controller.registration);
// router.get('/login', controller.getLogin);
router.post('/login', controller.login);
// router.get('/logout', controller.getLogout);
// router.post('/logout', controller.logout);





module.exports = router; 