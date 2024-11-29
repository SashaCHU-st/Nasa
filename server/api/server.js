const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const HttpError = require("./models/http-error");
const mongoose = require("mongoose");
const UserRoutes = require("./routes/user-routes");
const ArticlesRoutes = require("./routes/article-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", UserRoutes);
app.use("/api/articles", ArticlesRoutes);

app.use((req, res, next) => {
  const err = new HttpError("Could not find this route.", 404);
  throw err;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred!",
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// Vercel expects a serverless function handler
module.exports = (req, res) => {
  app(req, res);  // Use Express as middleware to handle the requests
};