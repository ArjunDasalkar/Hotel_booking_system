require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to MySQL database ✅");
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.admin = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

// Admin Registration (Sign-Up)
app.post("/admin/register",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        const query = "INSERT INTO Admins (username, password) VALUES (?, ?)";
        db.query(query, [username, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Admin registered successfully!" });
        });
    }
);

// Admin Login
app.post("/admin/login",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    (req, res) => {
        const { username, password } = req.body;

        const query = "SELECT * FROM Admins WHERE username = ?";
        db.query(query, [username], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

            const admin = results[0];
            if (!bcrypt.compareSync(password, admin.password))
                return res.status(401).json({ error: "Invalid credentials" });

            const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "72h" });
            res.json({ message: "Login successful", token });
        });
    }
);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});
