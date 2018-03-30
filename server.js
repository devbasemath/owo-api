const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const invoiceRoutes = require("./app/routes/invoices");
const userRoutes = require("./app/routes/users");
const Invoice = require("./app/models/invoice");
const User = require("./app/models/user");
const helmet = require("helmet");
const logger = require("morgan");

const app = express();
// Connect to DB
mongoose.connect("mongodb://localhost:27017/enoch");

// MIDDLEWARE
// logger (morgan)
app.use(logger("dev"));

// Security; XSS Protection, anti-Clickingjacking
// Context-Security-Policy header etc
app.use(helmet());

// Configure app for bodyParser()
// Let us grab data form the body of a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES
// invoiceRoutes(app);
app.use("/api/users", userRoutes);
app.use("/api/invoices", invoiceRoutes);

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
