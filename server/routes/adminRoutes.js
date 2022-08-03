const express = require("express");
const router = express.Router();
const { isAdminProfile } = require("../controllers/profileController");
const { protect } = require('../middleware/authMiddleware');
const { getProfile, editProfile }= require('../controllers/adminController')

router.route("/useprofile/:email").get(protect, isAdminProfile, getProfile)
                                  .patch(protect, isAdminProfile, editProfile);

module.exports = router;