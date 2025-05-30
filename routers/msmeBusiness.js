const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const MSMEBusinessController = require('../controllers/msmeBusiness.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

// Done 
router.post('/add',[
    body('name_of_organization').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
], MSMEBusinessController.add);


router.post('/login',[
    body('email_address').isEmail().withMessage('Please enter a valid email'),
    body('password'),
], MSMEBusinessController.loginUser);


router.put('/update/:id',[
    body('name_of_organization').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
],authMiddleware.authAdmin, MSMEBusinessController.update);

// Done 
router.get('/list', MSMEBusinessController.get);
router.get('/list-according-category-id/:business_category_id', MSMEBusinessController.getListAccordingToCategoryId);

router.get('/msme-details/:id', MSMEBusinessController.getMSMEDetails);


// Verify MSME Business
router.put('/verify-msme/:id',[
],authMiddleware.authAdmin, MSMEBusinessController.verifyMSME);


router.get('/search-by-name/:name_of_organization',[
], MSMEBusinessController.searchByName);


router.get('/search-by-region/:region',[
], MSMEBusinessController.searchByRegion);


router.put('/delete/:id',authMiddleware.authAdmin, MSMEBusinessController.delete);




module.exports = router;