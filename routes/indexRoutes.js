const { Router } = require('express');
const router = new Router();

const { indexView } = require('../controllers/indexController.js');

router.get('/', indexView);

module.exports = router;