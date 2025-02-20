const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // To work with file paths
const app = express();
const PORT = 3000;

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        
        // Create table
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                femaleinstem TEXT NOT NULL,
                hobby TEXT NOT NULL,
                achievement TEXT NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error("Error creating table:", err.message);
            } else {
                console.log("Users table is ready.");
            }
        });
    }
});

// CREATE: Add a new user
app.post("/users", (req, res) => {
    const { femaleinstem, hobby, achievement } = req.body;
    if (!femaleinstem || !hobby || !achievement) {
        return res.status(400).json({ error: "Female in STEM, hobby, and achievement are required" });
    }
    
    db.run("INSERT INTO users (femaleinstem, hobby, achievement) VALUES (?, ?, ?)", 
        [femaleinstem, hobby, achievement], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, femaleinstem, hobby, achievement });
        }
    );
});

// READ: Get all users
app.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// UPDATE: Update a user
app.put("/users/:id", (req, res) => {
    const { femaleinstem, hobby, achievement } = req.body;
    const { id } = req.params;
    
    if (!femaleinstem || !hobby || !achievement) {
        return res.status(400).json({ error: "Female in STEM, hobby, and achievement are required" });
    }
    
    db.run(
        "UPDATE users SET femaleinstem = ?, hobby = ?, achievement = ? WHERE id = ?",
        [femaleinstem, hobby, achievement, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json({ 
                id, 
                femaleinstem, 
                hobby, 
                achievement, 
                message: "User updated successfully" 
            });
        }
    );
});

// DELETE: Remove a user by ID
app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM users WHERE id = ?", id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: `User with ID ${id} deleted successfully` });
    });
});

// Close database on shutdown
process.on("SIGINT", () => {
    db.close((err) => {
        if (err) {
            console.error("Error closing database:", err.message);
        } else {
            console.log("Database connection closed.");
        }
        process.exit();
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
