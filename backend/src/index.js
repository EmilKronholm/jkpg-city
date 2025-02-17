const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).send("Docker is easy 🐬")
})

const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`App listening on http://localhost:${8080}`)
})