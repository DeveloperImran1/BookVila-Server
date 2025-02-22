const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
