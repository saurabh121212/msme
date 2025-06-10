const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const dashboardController = require('../controllers/dashboardController');

// This route is used to give dashboard access to the admin
// It requires the user to be authenticated as an admin


router.get('/data/:year',authMiddleware.authAdmin,dashboardController.getDashboardData);

router.get('/msme_total/:year',authMiddleware.authAdmin,dashboardController.getMSMETotalData);

router.get('/msme_requests/:year',authMiddleware.authAdmin,dashboardController.getDashboardMSMERequestsData);

router.get('/msme_according_to_turnover/:year',authMiddleware.authAdmin,dashboardController.getDashboardAccordingToTurnoverData);

 router.get('/msme_region_wise/:year',authMiddleware.authAdmin,dashboardController.getDashboardMSMERegionWiseData);


// router.get('/weather_data_requests/:year',authMiddleware.authAdmin,dashboardController.getDashboardWeatherDataRequests);

// router.get('/incidents_reported/:year',authMiddleware.authAdmin,dashboardController.getDashboardIncidentsReportedData);

// router.get('/alarts_type/:year',authMiddleware.authAdmin,dashboardController.getDashboardAlartsTypeData);

// router.get('/users_region_wise/:year',authMiddleware.authAdmin,dashboardController.getDashboardUsersRegionWiseData);


// router.put('/delete/:id',authMiddleware.authAdmin, FAQsController.deleteFAQs);

module.exports = router;
