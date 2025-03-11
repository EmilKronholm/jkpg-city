const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const router = express.Router()

const JWT_SECRET = "super_secret_key";

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