//routes/auth.js
const express = require('express');
const router = express.Router();

const RevenueService = require('../services/revenue');

router.get(':type', (req, res) => {
    res.json(':type');
});

module.exports = router;
