const express = require("express")
const router = express.Router()
const UserServices = require("./../Services/userServices")
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const JWT_SECRET = "super_secret_key";

// List all users
router.get('/users', async (req, res) => {
    const userJSON = await UserServices.getAllUsers();
    return res.status(200).json(userJSON);
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
    const id = req.params.id || 0;
    const userJSON = await UserServices.getUser(id);
    return res.status(200).json(userJSON);
});

// Create a new user. Username & password should be passed via body
router.post('/users', async (req, res) => {

    // Get passed username and password from request body
    const { username, password } = req.body
    if (username === undefined || password === undefined) {
        return res.status(400).json({ message: "Username or password wasn't passed correctly." })
    }

    // Check if username is available
    const isUsernameOccupied = (await UserServices.getUserByUsername(username)).length !== 0;
    if (isUsernameOccupied) {
        return res.status(400).json({ message: "A user already exists with that username." });
    }

    // User will now be created
    // Hash the password 
    // saltRounds defines the work factor - how costly (effectivly how long it takes to hash something) the hashing will be. 10 means 2^10 iterations.
    // This means that the hacker:      
    // 1. can't use pre-defined rainbow tables (because each password has a random salt)
    // 2. They have to brute-force each password individually, and each attempt is slowed down by the work factor to prevent brute force

    // Why we pick 10? Any number around 10 is fine. For critical platforms, 14 may be used. But if you priortize UX you might pick 8
    // Actually both 8-14 are generally fine and it can be argued that picking secure passwords (enforcing strict password validation rules) is far more important.
    // In future, when computers become much faster, we might have to increase it the saltrounds/cost factor.

    // 1. cant use pre-defiend hashtables (they have to rehash them based on salt, which is way more costly compared to just comapring two hashes)
    // 2. They have to compare not only to the most common passwords hashes, but they have to do it for 2^10 different salts.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Finalize the creation of password
    const result = await UserServices.createNewUser(username, hashedPassword);
    return res.status(200).json({ message: "User was created sucessfully." })
});

// Log in as user. Username & password should be passed via body
router.post('/users/login', async (req, res) => {
    const { username, password } = req.body
    if (username === undefined || password === undefined) {
        return res.status(400).json({ message: "Username or password wasn't passed correctly." })
    }

    const user = await UserServices.getUserByUsername(username)
    if (user.length === 0) {
        return res.status(400).json({ message: `There is no user with ${username}` });
    }

    if (await bcrypt.compare(password, user[0].hashed_password)) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('auth_token', token, { httpOnly: true, secure: false }); //secure: false for development, true for production:
        return res.status(200).json({ message: 'Logged in successfully' });
    }

    return res.status(400).json({ message: "Password is incorrect" });
});

// Log out current user 
router.post('/users/logout', (req, res) => {
    //Todo: destroy session
});

// Updates password for current user. Old and new password should be passed via body.
router.put('/users/update-password', (req, res) => {

});

module.exports = router;