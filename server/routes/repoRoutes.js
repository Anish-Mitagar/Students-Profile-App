const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/privateController");
const { getAllUsers, getFilteredUsers } = require("../controllers/repoController");
const { protect } = require('../middleware/authMiddleware');
const queryHelper = require('../utils/queryHelper');

router.route("/").get(protect, getPrivateData);

router.route("/users/:profilesPerPage/:pageNum").get(protect, getAllUsers);

router.route(`/filteredusers${queryHelper.queryParams()}/:profilesPerPage/:pageNum`).get(protect, getFilteredUsers);

module.exports = router;