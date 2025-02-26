const express = require('express')
const pool = require("./db");

const app = express()

const userRouter = require("./Routes/userRoutes")


app.get('/', (req, res) => {
    res.status(200).send("Docker is easy 🐬")
})

app.get("/person", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM person");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

app.use(userRouter)


const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`App listening on http://localhost:${8080}`)
})