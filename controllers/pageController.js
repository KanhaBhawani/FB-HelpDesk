const axios = require('axios');

exports.connectPage = async (req, res) => {
    try {
        const { accessToken } = req.body;
        // Your logic to retrieve user from request
        const user = req.user;

        // Use the access token to fetch user's Facebook pages
        const response = await axios.get(`https://graph.facebook.com/v12.0/me/accounts?access_token=${accessToken}`);
        const pages = response.data.data;

        // Save pages to user's document in the database
        user.pages = pages.map(page => ({ id: page.id, name: page.name }));
        await user.save();

        res.status(200).send('Facebook page connected successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
