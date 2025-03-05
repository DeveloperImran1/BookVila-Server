const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: [String],
    required: true,
  },
  publisher: {
    type: [String],
  },
  category: {
    type: [String],
  },
  subCategory: {
    type: [String],
  },
  subject: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
  },
  language: {
    type: String,
  },
  bookID: {
    type: String,
    // unique: true,
  },

  publicationID: {
    type: String,
    // index: false, // Index Remove
    // unique: false, // Unique Remove
  },

  edition: {
    type: String,
  },
  publicationDate: {
    type: Date,
    default: Date.now(),
  },
  pages: {
    type: Number,
  },
  format: {
    type: String,
  },
  binding: {
    type: String,
  },
  country: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  rating: {
    type: [Number],
    validate: {
      validator: function (v) {
        return v.every((rating) => rating >= 0 && rating <= 5); // Ratings should be between 0 and 5
      },
      message: "Ratings must be between 0 and 5",
    },
  },
  description: {
    type: String,
  },
  authorInfo: {
    name: {
      type: [String],
      // required: true,
    },
    authorID: {
      type: String,
      // required: true,
    },
  },
  buyingOptions: [
    {
      type: {
        type: String,
      },
      price: {
        type: Number,
      },
      fileLink: {
        type: String,
      },
    },
  ],
  isFeatured: { type: Boolean },
  isRecentlyAdded: { type: Boolean },
  isFlashSale: { type: Boolean },
  isPreOrder: { type: Boolean },
  isBestSelling: { type: Boolean },
  isComboOffer: { type: Boolean },
  isTrending: { type: Boolean },
  isGift: { type: Boolean },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Books", bookSchema);
