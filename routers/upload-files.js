const router = require('express').Router();
const FileController = require('../controllers/file.controller');
const uploader = require('../middelware/uploads')

router.post('/business-categories-image',  uploader("image", 20, "weatherCategories").single("file"), FileController.uploadFile);

router.post('/partners-logo-image',  uploader("image", 20, "partnersLogo").single("file"), FileController.uploadFile);

router.post('/team-member-image',  uploader("image", 20, "teamMemberImage").single("file"), FileController.uploadFile);

router.post('/home-banner-image',  uploader("image", 20, "homeBannerImage").single("file"), FileController.uploadFile);


// router.post('/gallery-image', uploader("image", 20, "galleryImage").array("file",15), FileController.uploadMultipleFiles);

module.exports = router;




