const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const connectDB = require("./config/db");
const { loggingMiddleware, errorHandlingMiddleware } = require("./middlewear/loggingMiddlewear");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewears
app.use(express.json());
app.use(cors());
//Logging Middlewear
app.use(loggingMiddleware);


// Routes
app.use('/api/auth', authRoutes);


//Error Logger Middlewear
app.use(errorHandlingMiddleware);



//DB Connection
connectDB();

// SSL Certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
};

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
