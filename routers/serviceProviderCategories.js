const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middelware/auth.middelware');
const serviceProviderCategoriesController = require('../controllers/serviceProviderCategories.contoller');

// This route is used to add a new weather category
// It requires the user to be authenticated as an admin

router.post('/add',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('Description must be at least 3 characters long'),
    body('icon_url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, serviceProviderCategoriesController.add);

router.put('/update/:id',[
    body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    body('description').isLength({min: 3}).withMessage('Description must be at least 3 characters long'),
    body('icon_url').notEmpty().withMessage('url is required'),
],authMiddleware.authAdmin, serviceProviderCategoriesController.update);


router.get('/list', serviceProviderCategoriesController.get);
router.put('/delete/:id',authMiddleware.authAdmin, serviceProviderCategoriesController.delete);

router.get('/search_by_name', serviceProviderCategoriesController.searchServiceProviderCategories);





module.exports = router;