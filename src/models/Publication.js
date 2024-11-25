
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const publicationSchema = new mongoose.Schema({
  publicationID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: [String], // Array to support multiple names (e.g., in different languages)
    required: true
  },
  
  photo: {
    type: String,
    required: true
  },
  books: {
    type: [bookSchema], // Array of bookSchema objects
    required: true
  }
});

module.exports = mongoose.model('publications', publicationSchema);


