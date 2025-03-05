const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  bengali: {
    type: String,
    required: true,
  },
  english: {
    type: String,
    required: true,
  },
  banglish: {
    type: String,
    required: true,
  },
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
