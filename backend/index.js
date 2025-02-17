const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
const cors = require('cors');
const { connection } = require("./config/connection");

// Middleware
app.use(cors());
app.use(express.json()); // This handles JSON body parsing
app.use(express.urlencoded({ extended: true })); // Handles URL-encoded data

// Routes
app.use("/api/admin", require("./src/admin/routes/index")); // Admin Router
app.use("/api/web", require("./src/web/routes/index")); // web Router


// Starting the server
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// Establishing the database connection
connection();
