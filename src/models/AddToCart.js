
const mongoose = require('mongoose');


const addToCartSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  books: {
    type: Object, // Array of bookSchema objects
  }
});

module.exports = mongoose.model('addToCart', addToCartSchema);


