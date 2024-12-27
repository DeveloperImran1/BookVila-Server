const mongoose = require('mongoose');


const checkOut = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('checkout', checkOut);


