const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/privateController");
const { getProfileData, createProfile } = require("../controllers/profileController");
const { protect } = require('../middleware/authMiddleware');

router.route("/").get(protect, getPrivateData);

router.route("/profile").get(protect, getProfileData);

router.route("/createprofile").post(protect, createProfile);

module.exports = router;