const express = require('express');
const { scheduleMessage } = require('../controllers/schedule.controller');

const router = express.Router();

router.post('/', scheduleMessage);

module.exports = router;
