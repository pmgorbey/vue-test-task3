const Router = require('express');
const controller = require('../controllers/ControllerUserInfo');

const router = new Router();

router.get('/users/:id', controller.get);
router.get('/users', controller.getAll);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete);


module.exports = router;