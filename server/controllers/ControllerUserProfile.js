const ModelUserProfile = require('../models/ModelUserProfile');

class ControllerUserProfile {
    async get(req, res, next) {
        try {
            const profile = await ModelUserProfile.findById(req.params.id)
            return res.status(200).json(profile)
        } catch(error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const profiles = await ModelUserProfile.find()
            return res.status(200).json(profiles);
        } catch(error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const profile = new ModelUserProfile({...req.body});
            const newProfile = profile.save()
            return res.status(200).send(newProfile)
        } catch(error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const profile = await ModelUserProfile.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
            return res.status(200).send(profile);
        } catch(error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await ModelUserProfile.findByIdAndDelete(req.params.id)
            console.log(req.body)
            return res.status(200).json({status: 'OK', message: 'Item is delete ... '});
        } catch(error) {
            next(error)
        }
    }
}

module.exports = new ControllerUserProfile();