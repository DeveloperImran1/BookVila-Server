
const mongoose = require('mongoose');


const favoruteSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  books: {
    type: Object, // Array of bookSchema objects
  }
});

module.exports = mongoose.model('favorutes', favoruteSchema);


