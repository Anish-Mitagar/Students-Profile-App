const UserProfile = require('../models/UserProfile');
const ErrorResponse = require('../utils/errorResponse');

exports.getProfileData = async (req, res, next) => {
    const user = req.user
    const email = user.email

    try {
        const userProfile = await UserProfile.findOne({ email });

        if (!userProfile) {
            res.status(200).json({
                success: true,
                msg: "You need to make your account profile!",
                userHasProfile: false,
                userProfile: {
                    "firstname": "Need First Name",
                    "lastname": "Need Last Name",
                    "email": email,
                    "major1": "Need Major",
                    "major2": "None",
                    "minor": "None",
                    "gpa": 0.0,
                    "year": "None",
                    "classes": [],
                    "istutor": false,
                    "tutorrating": 0,
                    "interests": [],
                    "flag": false
                }
            });
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
        return next(new ErrorResponse("Unable to retrieve Account Profile", 500));
    }

}

exports.createProfile = async (req, res, next) => {
    const userProfileToBeCreated = req.body; 

    try {
        const userProfile = await UserProfile.create(userProfileToBeCreated)
        res.status(200).json({
            success: true,
            msg: "Created account profile information!",
            userHasProfile: true,
            userProfile: userProfileToBeCreated
        });
    } catch (error) {
        console.log(error.message)
        return next(new ErrorResponse("Unable to create Account Profile", 500));
    }
}

exports.updateProfile = async (req, res, next) => {
    const user = req.user
    const email = user.email
    const toBeUpdatedFields = req.body; 

    if (toBeUpdatedFields.hasOwnProperty("email")){
        const updatedEmail = toBeUpdatedFields.email
        const alreadyExists = await UserProfile.findOne({ updatedEmail });
        if (alreadyExists) {
            return next(new ErrorResponse("Another account already uses this email!", 500));
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
        return next(new ErrorResponse("Unable to create Account Profile", 500));
    }
}