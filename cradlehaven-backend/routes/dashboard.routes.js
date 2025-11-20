import express from 'express';
const router = express.Router();
import * as dashboardController from '../controllers/dashboard.controller.js';

// @route   GET /api/dashboard/stats
router.get('/stats', dashboardController.getDashboardStats);

export default router;