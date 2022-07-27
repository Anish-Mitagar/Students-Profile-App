const UserProfile = require('../models/UserProfile');
const ErrorResponse = require('../utils/errorResponse');
const queryHelper = require('../utils/queryHelper');

exports.getAllUsers = async (req, res, next) => {
    const pageNum = req.params.pageNum
    const profilesPerPage = req.params.profilesPerPage

    try {
        const results = await UserProfile.find().sort({}).skip(pageNum*profilesPerPage).limit(profilesPerPage);
        res.status(200).json({
            success: true,
            msg: "Retrieved Profiles!",
            profiles: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve Profiles", 500));
    }

}

exports.getFilteredUsers = async (req, res, next) => {
    // const firstname = req.params.first_name
    // const lastname = req.params.last_name
    // const tutorrating = req.params.tutor_rating
    // const major = req.params.major
    // const year = req.params.year
    // const order = req.params.order
    // const order2 = req.params.order2
    const query = queryHelper.buildQuery(req.params);
    const pageNum = req.params.pageNum
    const profilesPerPage = req.params.profilesPerPage

    try {
        results = await UserProfile.find(query.filterConfig).sort(query.sortingConfig).skip(pageNum*profilesPerPage).limit(profilesPerPage);
        res.status(200).json({
            success: true,
            msg: "Retrieved Profiles!",
            query: query,
            profiles: results
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve Profiles", 500));
    }

}