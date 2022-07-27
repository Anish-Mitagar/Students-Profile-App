const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/privateController");
const { protect } = require('../middleware/authMiddleware');
const queryHelper = require('../utils/queryHelper');

router.route("/").get(protect, getPrivateData);

router.route("/users").get(protect, getPrivateData);

router.route(`/filteredusers${queryHelper.queryParams()}/:page`).get(protect, getPrivateData);

module.exports = router;