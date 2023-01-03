const Router = require('express');
const {check} = require('express-validator');
const controller = require('../controllers/ControllerUserProfile');


const router = new Router();

router.get('/profiles/:id', controller.get);
router.get('/profiles', controller.getAll);
// router.post('/profiles', check('name', 'Імя не може бути пустим').exists(), controller.create);
router.post('/profiles', check('userName', 'Імя не може бути пустим').notEmpty(), controller.create);
router.put('/profiles/:id', controller.update);
router.delete('/profiles/:id', controller.delete);

module.exports = router;