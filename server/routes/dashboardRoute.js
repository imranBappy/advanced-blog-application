const { dashboardBlogsGetController } = require('../controllers/dashboardController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const upload = require('../middlewares/uploadMiddleware');

const router = require('express').Router();

router.get('/blogs', isAuthenticated, dashboardBlogsGetController);

module.exports = router;