const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide a first name"]
    },
    lastname: {
        type: String,
        required: [true, "Please provide a last name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    major1: {
        type: String,
        required: [true, "Please provide a major"]
    },
    major2: {
        type: String,
        required: [false, "May provide a second major"]
    },
    minor: {
        type: String,
        required: [false, "May provide a minor"]
    },
    gpa: {
        type: Number,
        required: [true, "Must have a GPA"]
    },
    year: {
        type: String,
        required: [true, "Must have a school year"]
    },
    classes: {
        type: [String],
        required: [true, "Must have an existing classes array"],
        default: []
    },
    istutor: {
        type: Boolean,
        required: [true, "Must have a tutoring status"],
        default: false
    },
    tutorrating: {
        type: Number,
        required: [true, "Must have a tutor rating"],
        default: 0.0
    },
    interests: {
        type: [String],
        required: [true, "Must have an existing interests array"],
        default: []
    },
    flag: {
        type: Boolean,
        required: [true, "Must have a flag"],
        default: false
    },
});

const UserProfile = mongoose.model("User_Profile", UserProfileSchema);

module.exports = UserProfile;