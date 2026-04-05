const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/courses', (req, res) => {
    db.query("SELECT * FROM courses ORDER BY id DESC", (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

router.post('/add-course', (req, res) => {
    const { title, description, price, thumbnail } = req.body;
    const sql = "INSERT INTO courses (title, description, price, thumbnail) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, description, price, thumbnail], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Course Added" });
    });
});

router.delete('/courses/:id', (req, res) => {
    db.query("DELETE FROM courses WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});

router.get('/blogs', (req, res) => {
    db.query("SELECT * FROM blogs ORDER BY created_at DESC", (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});


router.post('/add-blog', (req, res) => {
    const { title, category, description, image_url } = req.body;
    const sql = "INSERT INTO blogs (title, category, description, image_url) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, category, description, image_url], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Blog Published" });
    });
});


router.delete('/blogs/:id', (req, res) => {
    db.query("DELETE FROM blogs WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});


router.get('/enrollments', (req, res) => {
    const sql = `SELECT enrollments.id, enrollments.user_name AS student_name, 
                 enrollments.user_email AS student_email, courses.title AS course_title, 
                 enrollments.enrolled_at FROM enrollments 
                 JOIN courses ON enrollments.course_id = courses.id 
                 ORDER BY enrollments.enrolled_at DESC`;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});


router.get('/messages', (req, res) => {
    const isArchived = req.query.archived || 0;
    const sql = "SELECT * FROM contact_messages WHERE is_archived = ? ORDER BY created_at DESC";
    db.query(sql, [isArchived], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});


router.put('/messages/:action/:id', (req, res) => {
    const status = req.params.action === 'archive' ? 1 : 0;
    db.query("UPDATE contact_messages SET is_archived = ? WHERE id = ?", [status, req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Status Updated" });
    });
});


router.delete('/messages/:id', (req, res) => {
    db.query("DELETE FROM contact_messages WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Deleted" });
    });
});

module.exports = router;