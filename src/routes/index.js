const express = require("express");
const router = express.Router();

// Import all sub-routes
const uploadRoute = require('./upload.route');
const policyRoute = require('./policy.route');
const scheduleRoute = require('./schedule.route');

// ------------------- Modular routes -------------------
router.use('/upload', uploadRoute);
router.use('/policies', policyRoute);
router.use('/schedule', scheduleRoute);


module.exports = router;