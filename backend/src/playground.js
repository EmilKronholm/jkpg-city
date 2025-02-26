require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
});

const uniqueTags = [
	'Öster',
	null,
	'Väster',
	'Tändsticksområdet',
	'Atollen',
	'Resecentrum'
]

uniqueTags.forEach((x) => {
    if (!x) return;
	console.log(`${x}`)
    pool.query(`INSERT INTO district (create_time, name) VALUES (NOW(), $1)`, [x]);
});