const { commentsPostController } = require('../controllers/commentsController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const upload = require('../middlewares/uploadMiddleware');

const router = require('express').Router();

router.post('/:blogId', isAuthenticated, commentsPostController);

module.exports = router;