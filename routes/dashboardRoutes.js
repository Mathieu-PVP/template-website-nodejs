const { Router } = require('express');
const router = new Router();

const { isConnected } = require('../middlewares/authMiddleware');
const { dashboardView } = require('../controllers/dashboardController.js');

router.get('/', [isConnected], dashboardView);

module.exports = router;