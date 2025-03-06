const express = require('express')
const pool = require("./db");

const app = express();


const cors = require('cors')
app.use(cors({ origin: "http://localhost:3001" }));

app.use(express.json())

const userRouter = require("./Routes/userRoutes");
const vendorRouter = require("./Routes/vendorRoutes");


app.get('/', (req, res) => {
    res.status(200).json("Successfully connected to JKPG-CITY api 🚀");
});

app.get("/person", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM person");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});



app.get("/auth", (req, res) => {
    res.status(403).send("NOOO")
    // res.status(200).send("OKKKKK")
})

app.use(userRouter);
app.use(vendorRouter);

const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`App listening on http://localhost:${8080}`);
})