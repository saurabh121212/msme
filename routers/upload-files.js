const router = require('express').Router();
const FileController = require('../controllers/file.controller');
const uploader = require('../middelware/uploads')

router.post('/business-categories-image',  uploader("image", 20, "weatherCategories").single("file"), FileController.uploadFile);

router.post('/partners-logo-image',  uploader("image", 20, "partnersLogo").single("file"), FileController.uploadFile);

router.post('/team-member-image',  uploader("image", 20, "teamMemberImage").single("file"), FileController.uploadFile);

router.post('/home-banner-image',  uploader("image", 20, "homeBannerImage").single("file"), FileController.uploadFile);

router.post('/blog-image',  uploader("image", 20, "blogImage").single("file"), FileController.uploadFile);

router.post('/downloads',  uploader("document", 20, "downloadsFile").single("file"), FileController.uploadFile);

router.post('/service-provider-categories-image',  uploader("image", 20, "serviceProviderCategoriesImage").single("file"), FileController.uploadFile);

router.post('/service-providers-image',  uploader("image", 20, "serviceProvidersImage").single("file"), FileController.uploadFile);

router.post('/business-image',  uploader("image", 20, "businessImage").single("file"), FileController.uploadFile);

router.post('/business-profile',  uploader("document", 20, "businessProfile").single("file"), FileController.uploadFile);

router.post('/incorporation-image',  uploader("image-document", 20, "incorporationProfile").single("file"), FileController.uploadFile);



// router.post('/gallery-image', uploader("image", 20, "galleryImage").array("file",15), FileController.uploadMultipleFiles);

module.exports = router;




