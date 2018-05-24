const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./app/routes/users");
const recipientRoutes = require("./app/routes/recipients");
const User = require("./app/models/user");
const Recipient = require("./app/models/recipient");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Security; XSS Protection, anti-Clickingjacking
// Context-Security-Policy header etc
app.use(helmet());

// Connect to DB
mongoose.connect("mongodb://localhost:27017/owo");

// MIDDLEWARES
// logger (morgan)
app.use(morgan("dev"));

// Configure app for bodyParser()
// Let us grab data form the body of a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/recipients", recipientRoutes);

// Catch 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });

  console.error(err);
});

// // Set up port for server to listen on
var port = process.env.PORT || 3000;
//Fire up server
app.listen(port);
// Print friendly message to console
console.info("Server listening on port: " + port);
