const express = require("express");
require("dotenv").config();

const app = express();

// JSON parsing
app.use(express.json());

// Custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Static HTML page
app.use(express.static("public"));

// GET /
app.get("/", (req, res) => {
  res.send("My Week 2 API");
});

// POST /user
app.post("/user", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Name and email are required"
    });
  }

  res.json({
    message: `Hello, ${name}!`
  });
});

// GET /user/:id
app.get("/user/:id", (req, res) => {
  res.json({
    message: `User ${req.params.id} profile`
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
