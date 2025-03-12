require("dotenv").config();
const { Pool } = require("pg");
const fs = require('fs');
const { rawListeners } = require("process");
const { json } = require("stream/consumers");
const { create } = require("domain");

const data = fs.readFileSync('./src/updated_data.json')
const jsonData = JSON.parse(data);

const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

const uniqueTags = [
    'Tändsticksområdet',
    'Atollen',
    'Väster',
    'Öster',
    'Resecentrum'
]

const createTags = () => {
    uniqueTags.forEach((x) => {
        if (!x) return;
        console.log(`${x}`)
        pool.query(`INSERT INTO district (create_time, name) VALUES (CURRENT_TIMESTAMP, $1)`, [x]);
    });
};

const createVendors = () => {
    console.log(jsonData);
    jsonData.forEach(async (vendor) => {
        console.log("\n \n Nu kör vi:")
        console.log(vendor)
        const name = vendor.name
        const url = vendor.url
        const score = vendor.grade
        const address = vendor.address

        let districtFK = uniqueTags.indexOf(vendor.district) + 1;
        districtFK = (districtFK == 0) ? null : districtFK;
        if (districtFK == null) {
            console.log(vendor)
        }

        await pool.query(`INSERT INTO vendors (name, url, districtFK, score, adress) values
        ($1, $2, $3, $4, $5)`, [name, url, districtFK, score, address]);
    });
}
// createTags();
createVendors();

// console.log(Object.keys(jsonData).length)