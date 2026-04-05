const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/courses', (req, res) => {
    db.query("SELECT * FROM courses", (err, data) => res.json(data));
});

router.get('/course/:id', (req, res) => {
    db.query("SELECT * FROM courses WHERE id = ?", [req.params.id], (err, data) => {
        if (data.length === 0) return res.status(404).json({ error: "Not found" });
        res.json(data[0]);
    });
});

router.post('/enroll', (req, res) => {
    const { course_id, user_name, user_email } = req.body;
    const sql = "INSERT INTO enrollments (course_id, user_name, user_email) VALUES (?, ?, ?)";
    db.query(sql, [course_id, user_name, user_email], (err) => res.json({ message: "Success" }));
});

router.get('/blogs', (req, res) => {
    db.query("SELECT * FROM blogs ORDER BY created_at DESC", (err, data) => res.json(data));
});


router.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ? ,?)";
    db.query(sql, [name, email, subject, message], (err) => res.json({ message: "Sent" }));
});

module.exports = router;

router.get('/blog/:id', (req, res) => {
    const sql = "SELECT * FROM blogs WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ error: "Blog post not found" });
        
        
        res.json(data[0]); 
    });
});