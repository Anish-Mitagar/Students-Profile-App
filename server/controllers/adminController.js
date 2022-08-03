const ErrorResponse = require('../utils/errorResponse');
const UserProfile = require('../models/UserProfile');

exports.editProfile = async (req, res, next) => {
    const email = req.params.email
    const toBeUpdatedFields = req.body; 

    if (toBeUpdatedFields.hasOwnProperty("email")){
        const updatedEmail = toBeUpdatedFields.email
        if (updatedEmail !== email) {
            const alreadyExists = await UserProfile.findOne({ updatedEmail });
            if (alreadyExists) {
                return next(new ErrorResponse("Another account already uses this email!", 500));
            }
        }
    }

    try {
        const userProfile = await UserProfile.findOneAndUpdate({email}, toBeUpdatedFields, {
            upsert: false,
            returnOriginal: false
        });
        res.status(200).json({
            success: true,
            msg: "Updated account profile information!",
            updatedFields: toBeUpdatedFields,
            userUpdatedProfile: userProfile
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to update Account Profile", 500));
    }
}

exports.getProfile = async (req, res, next) => {
    const email = req.params.email

    try {
        const userProfile = await UserProfile.findOne({ email });

        if (!userProfile) {
            return next(new ErrorResponse("Unable to retrieve Account Profile! (try block)", 500));
        }
        else {
            res.status(200).json({
                success: true,
                msg: "Found account profile information!",
                userHasProfile: true,
                userProfile: userProfile
            });
        }

    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to retrieve Account Profile! (catch block)", 500));
    }

}