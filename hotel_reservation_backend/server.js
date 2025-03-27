require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection (Now using .env variables)
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


// Test Route to Check Connection Between Frontend and Backend
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is connected to Frontend!" });
});


// API Route to Get All Rooms
app.get("/rooms", (req, res) => {
    db.query("SELECT * FROM Rooms", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// API Route to Add a Customer
app.post("/customers", (req, res) => {
    const { name, email, phone, aadhaar } = req.body;
    const query = "INSERT INTO Customers (name, email, phone, aadhaar) VALUES (?, ?, ?, ?)";
    
    db.query(query, [name, email, phone, aadhaar], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Customer added successfully!", id: result.insertId });
    });
});

// API Route to Make a Reservation
app.post("/reservations", (req, res) => {
    const { customer_id, room_id, check_in, check_out } = req.body;
    
    const query = "INSERT INTO Reservations (customer_id, room_id, check_in, check_out) VALUES (?, ?, ?, ?)";
    
    db.query(query, [customer_id, room_id, check_in, check_out], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reservation successful!", id: result.insertId });
    });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
});
