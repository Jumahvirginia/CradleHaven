const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');

// @route   GET /api/dashboard/stats
router.get('/stats', dashboardController.getDashboardStats);

module.exports = router;