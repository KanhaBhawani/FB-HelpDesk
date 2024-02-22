// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const abcController = require('../controllers/abcController');

router.get('/receive', abcController.go);

module.exports = router;