const { authGetController, singinPostController, signupController, resetController, updateController } = require('../controllers/authControllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const upload = require('../middlewares/uploadMiddleware');

const router = require('express').Router();


router.get('/', isAuthenticated, authGetController);
router.post('/', singinPostController);
router.post('/register', signupController)
router.put('/update', isAuthenticated, upload.single("url"), updateController);
router.post('/reset', resetController);


module.exports = router;