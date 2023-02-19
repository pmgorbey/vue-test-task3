const ModelUserInfo = require('../models/ModelUserInfo');
const {validationResult} = require('express-validator');
const ApiError = require('../helpers/apiErrors');

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
            //Pagination
            const page = parseInt(req.query.page)
            // console.log(page);
            const limit = 4
            const skip = (page - 1) * limit
            const usersTotal = await ModelUserInfo.find()
            const pageTotal = Math.ceil(usersTotal.length / limit)
            
            // Sort
            const { sort } = req.query
            // console.log(sort)
            let users

            switch(sort) {
                case 'userName': 
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
                case 'surName': 
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({surName: 1})
                    break
                case 'email':
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({email: 1})
                    break
                case 'phoneNumber':
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({phoneNumber: 1})
                    break
                default: 
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
            }          
            return res.status(200).json({users, pageTotal});
        } catch(error) {
            next(error)
        }
    }

    async getInfoAll(req, res, next) {
        try {                      
            //Pagination
            const pageInfo = parseInt(req.query.pageInfo)
            const limit = 4
            const skip = (pageInfo - 1) * limit
            const usersTotal = await ModelUserInfo.find()
            const pageTotalInfo = Math.ceil(usersTotal.length / limit)
            
            // Sort
            const { sort } = req.query
            let users

            switch(sort) {
                case 'userName': 
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
                case 'email': 
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({email: 1})
                    break
                case 'phoneNumber':
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({phoneNumber: 1})
                    break
                default: 
                    users = await ModelUserInfo
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
            }          
            return res.status(200).json({users, pageTotalInfo});
        } catch(error) { 
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            //Express-Validator
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errValidation.array()));
            }

            const user = new ModelUserInfo({...req.body});
            const newUser = user.save()
            return res.status(200).json({newUser});
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

            // console.log(req.params.id);
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