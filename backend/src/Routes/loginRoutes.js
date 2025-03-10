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

        res.cookie('auth_token', token, { httpOnly: true, secure: false }); //secure: false for development, true for production:
        return res.status(200).json({ message: 'Logged in successfully' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.auth_token || undefined;

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

router.get("/auth", authenticateJWT, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user}, you are authenticated!` });
});

module.exports = { router, authenticateJWT }