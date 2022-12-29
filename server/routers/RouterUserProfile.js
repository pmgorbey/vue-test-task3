const Router = require('express');
const controller = require('../controllers/ControllerUserProfile');


const router = new Router();

router.get('/profiles/:id', controller.get);
router.get('/profiles', controller.getAll);
router.post('/profiles', controller.create);
router.put('/profiles/:id', controller.update);
router.delete('/profiles/:id', controller.delete);

module.exports = router;