// Importing necessary libraries
const mongoose = require("mongoose");

// Defining a structure for the data we want to store in the database
const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  qrCode: {
    type: String,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("urlModel", urlSchema);
