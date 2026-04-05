const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); 

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: "Email already exists" });
        res.status(200).json({ message: "User registered successfully" });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, data) => {
        if (err || data.length === 0) return res.status(404).json({ error: "User not found" });
        const isMatch = await bcrypt.compare(password, data[0].password);
        if (!isMatch) return res.status(401).json({ error: "Wrong password" });
        
        const token = jwt.sign({ id: data[0].id, role: data[0].role }, "secret_key", { expiresIn: "1h" });
        res.json({ token, userName: data[0].name, role: data[0].role });
    });
});

module.exports = router;