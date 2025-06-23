const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const dashboardController = require('../controllers/dashboardController');

// This route is used to give dashboard access to the admin
// It requires the user to be authenticated as an admin


router.get('/data/:year',authMiddleware.authAdmin,dashboardController.getDashboardData);

router.get('/msme_total/:year',authMiddleware.authAdmin,dashboardController.getMSMETotalData);

router.get('/msme_directors_info/:year',authMiddleware.authAdmin,dashboardController.getMSMEDirectorsInfoData);

router.get('/msme_requests/:year',authMiddleware.authAdmin,dashboardController.getDashboardMSMERequestsData);

router.get('/msme_according_to_turnover/:year',authMiddleware.authAdmin,dashboardController.getDashboardAccordingToTurnoverData);

router.get('/msme_region_wise/:year',authMiddleware.authAdmin,dashboardController.getDashboardMSMERegionWiseData);

router.get('/msme_list_according_to_category',authMiddleware.authAdmin,dashboardController.getDashboardMSMEListAccordingToCategoryData);

router.get('/service_provider_list_according_to_category',authMiddleware.authAdmin,dashboardController.getDashboardServiceProviderListAccordingToCategoryData);


module.exports = router;
