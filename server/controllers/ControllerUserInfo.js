const ModelUserInfo = require('../models/ModelUserInfo');

class ControllerUserInfo {
    async get(req, res, next) {
        try {
            const user = await ModelUserInfo.findById(req.params.id)
            return res.status(200).send(user)
        } catch(error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await ModelUserInfo.find()
            return res.status(200).json(users);
        } catch(error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const user = new ModelUserInfo({...req.body});
            const newUser = user.save()
            return res.status(200).json({newUser});
        } catch(error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const user = await ModelUserInfo.findByIdAndUpdate(req.params.id, req.body, {new: true})
            return res.status(200).send(user);
        } catch(error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await ModelUserInfo.findByIdAndDelete(req.params.id)
            return res.status(200).json({status: 'OK', message: 'Item is delete ... '});
        } catch(error) {
            next(error)
        }
    }
}

module.exports = new ControllerUserInfo();