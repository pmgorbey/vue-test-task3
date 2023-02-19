const ApiError = require('../helpers/apiErrors');
const ModelUser = require('../models/ModelUserInfo');

module.exports = async function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    }

    try {
        const candidate = req.body;
        const user = await ModelUser.findOne({userName: candidate.userName});
        if (user) {
            return next(ApiError.BadRequest(`User name ${candidate.userName} is already!`, (`User name ${candidate.userName} is already!`)));
        }
        next()
    } catch (err) {
        next(err);
    }
}

