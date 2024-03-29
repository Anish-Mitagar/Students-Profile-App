const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/privateController");
const { getProfileData, createProfile, updateProfile } = require("../controllers/profileController");
const { protect } = require('../middleware/authMiddleware');

router.route("/").get(protect, getPrivateData);

router.route("/profile").get(protect, getProfileData)
                        .post(protect, createProfile)
                        .patch(protect, updateProfile);

router.use("/repo", require("./repoRoutes"));

router.use("/admin", require("./adminRoutes"));

module.exports = router;