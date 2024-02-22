const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.post('/connect', pageController.connectPage);

module.exports = router;
