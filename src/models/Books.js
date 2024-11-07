const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: true
    },
    publisher: {
        type: [String],
        required: true
    },
    category: {
        type: [String],
        required: true
    },
    subCategory: {
        type: [String]
    },
    subject: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number
    },
    language: {
        type: String,
        required: true
    },
    bookID: {
        type: String,
        unique: true
    },
    edition: {
        type: String
    },
    publicationDate: {
        type: Date
    },
    pages: {
        type: Number
    },
    format: {
        type: String
    },
    binding: {
        type: String
    },
    country: {
        type: String
    },
    coverImage: {
        type: String
    },
    rating: {
        type: [Number]
    },
    description: {
        type: String
    },
    authorInfo: {
        name: {
            type: [String],
            required: true
        },
        authorID: {
            type: String,
            required: true
        }
    },
    publisherInfo: {
        name: {
            type: String,
            required: true
        },
        website: {
            type: String
        }
    },
    buyingOptions: [
        {
            type: {
                type: String
            },
            price: {
                type: Number
            },
            fileLink: {
                type: String
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
