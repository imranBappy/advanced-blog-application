const { blogGetController, blogsGetController, blogPostController, blogPatchController, blogDeleteController } = require('../controllers/blogController');
const deleteMedia = require('../middlewares/deleteMedia');
const isAuthenticated = require('../middlewares/isAuthenticated');
const upload = require('../middlewares/uploadMiddleware');

const router = require('express').Router();

router.get('/', blogsGetController);
router.get('/:blogId', blogGetController);
router.post('/', isAuthenticated, upload.single('thumbnail'), blogPostController);
router.patch('/:blogId', isAuthenticated, upload.single('thumbnail'), deleteMedia, blogPatchController);
router.delete('/:blogId', isAuthenticated, blogDeleteController);





module.exports = router;