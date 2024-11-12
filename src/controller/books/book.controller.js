
const Books = require("../../models/Books");

const getAllBooks = async (req, res) => {
  try {
    const { searchQuery, author, category, subject, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // MongoDB Query setup
    const query = {};

    // Search by book name (English & Bangla)
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      query.bookName = { $in: [regex] }; // Match any part of book name
    }

    // Filter by author
    if (author) {
      query["authorInfo.name"] = { $in: author.split(",") }; // Multiple authors can be selected
    }

    // Filter by category
    if (category) {
      query.category = { $in: category.split(",") };
    }

    // Filter by subject
    if (subject) {
      query.subject = { $in: subject.split(",") };
    }

    // Price Filter (minPrice, maxPrice)
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice; // Greater than or equal to minPrice
      if (maxPrice) query.price.$lte = maxPrice; // Less than or equal to maxPrice
    }

    // Pagination logic
    const books = await Books.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBooks = await Books.countDocuments(query);

    res.status(200).json({
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get featured books
const getFeaturedBooks = async (req, res) => {
  try {
    const { subCategory, searchQuery } = req.query;
    console.log(req.query)
    if (!subCategory) {
      return res.status(400).json({ message: "Subcategory is required" });
    }
    const query = { subCategory: subCategory }

    if (searchQuery) {
      console.log(searchQuery)
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      console.log(searchQuery)
      query.subCategory = { $in: [regex] }; // Match any part of book name
    }

    const books = await Books.find(query)

    res.status(200).json({ books });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { getAllBooks, getFeaturedBooks }