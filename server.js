// server.js
const express = require("express");
const cors = require("cors");
// Load environment variables immediately
require("dotenv").config(); 

const connectDB = require("./db/db");
const errorHandler = require("./middlewares/errorhandler");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows the server to accept JSON in the request body

// Connect to the database
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("User REST API is running! Access /api/users for data.");
});

// Routes
app.use("/api/users", userRoutes);

// Error handler (must be the last middleware added)
app.use(errorHandler);

// Listen to the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});