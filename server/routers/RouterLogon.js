const Router = require('express');
const controller = require('../controllers/ControllerLogon');
const mwLogon = require('../middleware/mwLogon')

const router = new Router();

router.post('/register', controller.registration);
router.post('/login', controller.login);
router.get('/user', controller.getUsers);


module.exports = router; 