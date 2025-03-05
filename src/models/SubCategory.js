const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
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

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
