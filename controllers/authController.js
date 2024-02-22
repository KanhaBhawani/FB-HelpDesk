// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || user.password !== password) {
            return res.status(401).send('Invalid email or password');
        }

        const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
