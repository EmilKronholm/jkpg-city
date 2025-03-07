const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const router = express.Router()

const JWT_SECRET = "super_secret_key";

const user = {
    user1: { password: '1234' }
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);

    if (username === "u" && password === "p") {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('auth_token', token, { httpOnly: true, secure: false }); //False for development
        return res.status(200).json({ message: 'Logged in successfully' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router