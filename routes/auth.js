const { Router } = require('express');
const router = new Router();

const { isConnected, isDeconnected } = require('../middlewares/authMiddleware');
const { loginView, registerView, loginUser, logoutUser, registerUser } = require('../controllers/authController.js');

router.get('/login', [isDeconnected], loginView);
router.post('/login', [isDeconnected], loginUser);
router.get('/logout', [isConnected], logoutUser);
router.get('/register', [isDeconnected], registerView);
router.post('/register',[isDeconnected], registerUser);

module.exports = router;