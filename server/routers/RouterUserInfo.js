const Router = require('express');
const controller = require('../controllers/ControllerUserInfo');
const {userValid} = require('../middleware/mwUserValid');
const userValidName = require('../middleware/mwUserValidName');
const userDelete = require('../middleware/mwUserDelete');
const mwLogon = require('../middleware/mwLogon')

const router = new Router();

router.get('/users/:id', mwLogon, controller.get);
router.get('/users', mwLogon, controller.getAll);
router.get('/usersInfo', mwLogon, controller.getInfoAll);
router.post('/users', mwLogon, userValid, userValidName, controller.create);
router.put('/users/:id', mwLogon, userValid, controller.update);
router.delete('/users/:id', mwLogon, userDelete, controller.delete);


module.exports = router;