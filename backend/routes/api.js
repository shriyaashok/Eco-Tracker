// Route definitions for EcoTracker API

const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const suggestionController = require('../controllers/suggestionController');
const entryController = require('../controllers/entryController');
const dashboardController = require('../controllers/dashboardController');

// Legacy endpoints (keep for backward compatibility)
router.post('/log', activityController.createLog);
router.get('/analytics', activityController.analytics);
router.post('/calc', activityController.calculateOnly);
router.get('/suggestions', suggestionController.getSuggestions);
router.get('/export', activityController.exportData);

// Entry management endpoints
router.post('/entries/vehicle', entryController.createVehicleEntry);
router.post('/entries/plastic', entryController.createPlasticEntry);
router.post('/entries/energy', entryController.createEnergyEntry);
router.post('/entries/plantation', entryController.createPlantationEntry);
router.get('/entries/history', entryController.getHistory);
router.get('/entries/recent', dashboardController.getRecentEntries);

// Dashboard and analytics endpoints
router.get('/dashboard/summary', dashboardController.getSummary);
router.get('/analytics/weekly', dashboardController.getWeeklyAnalytics);
router.get('/user/profile', dashboardController.getUserProfile);

module.exports = router;
