// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/conversations', messageController.conversations);
router.post('/send', messageController.sendMessages);

module.exports = router;