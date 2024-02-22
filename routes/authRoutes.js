const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Import axios for making HTTP requests
const axios = require('axios');

// Facebook OAuth configuration
const FACEBOOK_APP_ID = '3662243827438238';
const FACEBOOK_APP_SECRET = 'cf1acc00507cc25f5cb8fc8fe9fd11de';
const FACEBOOK_REDIRECT_URI = 'http://localhost:5000/api/auth/facebook/callback';
const FACEBOOK_SCOPES = ['manage_pages', 'pages_messaging', 'read_page_mailboxes'];

// Redirect users to Facebook login page
router.get('/facebook', (req, res) => {
    const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&scope=${FACEBOOK_SCOPES.join(',')}&response_type=code`;
    res.redirect(authUrl);
});

// Callback URL after user grants permissions
router.get('/facebook/callback', async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange authorization code for access token
        const response = await axios.get(`https://graph.facebook.com/v12.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`);
        const accessToken = response.data.access_token;

        // Save the access token or use it for further requests
        // For now, just send the access token in the response
        res.send(`Access Token: ${accessToken}`);
    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error.response.data);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
