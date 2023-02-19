const Router = require('express')
const controller = require('../controllers/ControllerUserProfile')
const { profileValid } = require('../middleware/mwProfileValid')
const profileUpdate = require('../middleware/mwProfileUpdate')
const mwLogon = require('../middleware/mwLogon')

const router = new Router()

router.get('/profiles/:id', mwLogon, controller.get)
router.get('/profiles', mwLogon, controller.getAll)
router.post('/profiles', mwLogon, profileValid, controller.create)
router.put('/profiles/:id', mwLogon, profileUpdate, controller.update)
router.delete('/profiles/:id', mwLogon, controller.delete)


module.exports = router