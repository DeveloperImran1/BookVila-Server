

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    user: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reviews', reviewSchema);
