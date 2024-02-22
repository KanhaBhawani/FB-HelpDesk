// controllers/messageController.js
const Conversation = require("../models/Conversation");
const axios = require("axios");

exports.conversations = async (req, res) => {
  try {
    const { PSID, access_token } = req.body; // page id
    // console.log(PSID, access_token);  

    const url = `https://graph.facebook.com/v19.0/${PSID}/conversations?fields=participants,messages{id,message}&access_token=${access_token}`;

    const response = await axios.get(url);

    console.log(response.data.data); // conversation recieved
    
    res.status(200).json(response.data.data);;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Internal Server Error");
  }
};

exports.sendMessages = async (req, res) => {
  try {
    const { PSID, access_token, recipient_id, message } = req.body;

    // Find the conversation by ID and update with the sent message
    const url = `https://graph.facebook.com/v19.0/${PSID}/messages?access_token=${access_token}`;
    const postData = {
      recipient: { id: recipient_id },
      messaging_type: "RESPONSE",
      message: { text: message },
    };
    const response = await axios.post(url, postData);
    console.log(response.data);

    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
