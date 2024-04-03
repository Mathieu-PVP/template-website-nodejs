const { Router } = require('express');
const router = new Router();

const { isConnected, isDeconnected } = require('../middlewares/authMiddleware');
const { loginView, registerView, loginUser, logoutUser, registerUser, forgotPasswordView, forgotPasswordUser, resetPasswordView, resetPasswordUser } = require('../controllers/authController.js');

router.get('/login', [isDeconnected], loginView);
router.post('/login', [isDeconnected], loginUser);
router.get('/logout', [isConnected], logoutUser);
router.get('/register', [isDeconnected], registerView);
router.post('/register',[isDeconnected], registerUser);
router.get('/forgot-password', [isDeconnected], forgotPasswordView);
router.post('/forgot-password', [isDeconnected], forgotPasswordUser);
router.get('/reset-password', [isDeconnected], resetPasswordView);
router.post('/reset-password', [isDeconnected], resetPasswordUser);

module.exports = router;