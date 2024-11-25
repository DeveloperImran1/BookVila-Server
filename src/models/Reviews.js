

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
    },
    userImage: {
        type: String,
    },
    bookPhoto: {
        type: [String],  // aikhane array er moddhe onekgulo image thakteo pare abar nao thakte pare
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 500
    },
    bookId: {
        type: String,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reviews', reviewSchema);
