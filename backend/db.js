const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",       
    password: "",       
    database: "lms_db"
});

db.connect((err) => {
    if (err) return console.error("Database connection failed: " + err.stack);
    console.log("Connected to MySQL database.");
});

module.exports = db;