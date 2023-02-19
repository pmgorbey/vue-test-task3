const ModelUserProfile = require('../models/ModelUserProfile');
const ApiError = require('../helpers/apiErrors');
const {validationResult} = require('express-validator');

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
            //Paginstion
            const page = parseInt(req.query.page)
            const limit = 12
            const skip = (page - 1) * limit
            const profilesTotal = await ModelUserProfile.find()
            const pageTotal = Math.ceil(profilesTotal.length / limit)

            // Sort
            const { sort } = req.query
            // console.log(sort)
            let profiles

            switch(sort) {
                case 'userName':
                    profiles = await ModelUserProfile
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
                case 'title':
                    profiles = await ModelUserProfile
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({title: 1})
                    break
                case 'description':
                    profiles = await ModelUserProfile
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({description: 1})
                    break
                case 'startDate':
                    profiles = await ModelUserProfile
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({startDate: 1})
                    break
                case 'endDate':
                    profiles = await ModelUserProfile
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({endDate: 1})
                    break
                default: 
                    profiles = await ModelUserProfile
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
            }

            return res.status(200).json({profiles, pageTotal});
            // return res.status(200).json(profiles);
        } catch(error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            //Express-Validator
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errorValidation.array()));
            }

            const profile = new ModelUserProfile({...req.body});
            const newProfile = profile.save()
            return res.status(200).send(newProfile)
    
        } catch(error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            //Express-Validator
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errorValidation.array()));
            }

            const profile = await ModelUserProfile.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
            return res.status(200).send(profile);
        } catch(error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await ModelUserProfile.findByIdAndDelete(req.params.id)
            return res.status(200).json({status: 'OK', message: 'Item is delete ... '});
        } catch(error) {
            next(error)
        }
    }
}

module.exports = new ControllerUserProfile();