const express = require('express');
const {
  searchPolicyByUsername,
  aggregatePoliciesByUser
} = require('../controllers/policy.controller');

const router = express.Router();

router.get('/search', searchPolicyByUsername);
router.get('/aggregate', aggregatePoliciesByUser);

module.exports = router;
