// models/Conversation.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    senderId: { type: String, required: true },
    recipientId: { type: String, required: true },
    messages: [{ senderId: String, message: String, timestamp: { type: Date, default: Date.now } }]
});

module.exports = mongoose.model('Conversation', conversationSchema);
