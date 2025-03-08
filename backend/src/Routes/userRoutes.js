const express = require("express")
const router = express.Router()
const UserServices = require("./../Services/userServices")
const bcrypt = require("bcrypt");

// List all users
router.get('/users', async (req, res) => {
    const userJSON = await UserServices.getAllUsers();
    res.status(200).json(userJSON);
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
    const id = req.params.id || 0;
    const userJSON = await UserServices.getUser(id);
    res.status(200).json(userJSON);
});

// Create a new user. Username & password should be passed via body
router.post('/users', async (req, res) => {
    const { username, password } = req.body
    console.log(`New user requested with U: ${username} & P: ${password}`);

    if (UserServices.getUserByUsername(username)[0] !== undefined) {
        res.status(400).json({ message: "A user already exists with that username." })
        return;
    }

    if (username === undefined || password === undefined) {
        res.status(400).json({ message: "Username or password wasn't passed correctly." })
    }

    const saltRounds = 10;
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await UserServices.createNewUser(username, hashedPassword);
    console.log(result)
    res.status(200).json("OK")
});

// Log in as user. Username & password should be passed via body
router.post('/users/login', async (req, res) => {
    const { username, password } = req.body

    console.log(`New user requested with U: ${username} & P: ${password}`);

    //todo implement hashing with bcrypt
    const hashedPassword = password
    const result = await UserServices.getUserByUsername(username)
    res.status(200).json((hashedPassword == result['password']) ? "Logged" : "Wrong U/P")

});

// Log out current user 
router.post('/users/logout', (req, res) => {
    //Todo: destroy session
});

// Updates password for current user. Old and new password should be passed via body.
router.put('/users/update-password', (req, res) => {

});

module.exports = router;