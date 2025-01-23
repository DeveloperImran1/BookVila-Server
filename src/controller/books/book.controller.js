
const Books = require("../../models/Books");
const { ObjectId } = require('mongodb');

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

const getSingleBook = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await Books.findOne(query);

    if (!result) {
      return res.status(404).send({ message: "Book Not Found" });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server Error" });
  }
};


// get featured books
const getFeaturedBooks = async (req, res) => {
  try {
    const { subCategory, searchQuery, page = 1 } = req.query;
    const limit = 12;
    // console.log(req.query)
    if (!subCategory) {
      return res.status(400).json({ message: "Subcategory is required" });
    }
    const query = { subCategory: subCategory }

    if (searchQuery) {
      // console.log(searchQuery)
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      console.log(searchQuery)
      query.bookName = { $in: regex };
    }

    const books = await Books.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const totalBooks = await Books.countDocuments(query);

    res.status(200).json({ books, totalBooks });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// get similar books by category
const getCaterogyBooks = async (req, res) => {
  try {
    const { category, searchQuery, page = 1 } = req.query;
    const limit = 12;
    // console.log(req.query)
    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }
    // Convert category to an array if it’s a string (to handle query strings like `?category=Novel&category=উপন্যাস`)
    const categories = Array.isArray(category) ? category : [category];

    // Create query with $in to match any value in the category array
    const query = { category: { $in: categories } };

 

    const books = await Books.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const totalBooks = await Books.countDocuments(query);

    res.status(200).json({ books, totalBooks });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}





// get Budjet Friendly books
const getBudgetFriendlyBooks = async (req, res) => {
  try {
    const { searchQuery, page = 1 } = req.query;
    const limit = 12;
   
    const query = { price: {$lt: 151} }

    if (searchQuery) {
      console.log(searchQuery)
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      console.log(searchQuery)
      query.bookName = { $in: regex };
    }

    const books = await Books.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const totalBooks = await Books.countDocuments(query);

    res.status(200).json({ books, totalBooks });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}





// getAll Books
const getBooks = async (req, res) => {
  try {
    const query = {};
    const {searchQuery} = req.query;
    if (searchQuery) {
      // console.log(searchQuery)
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      // console.log(searchQuery)
      query.bookName = { $in: regex };
    }
    const books = await Books.find(query)
   
    res.status(200).json(books);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}





module.exports = { getAllBooks,  getSingleBook, getFeaturedBooks, getBooks, getBudgetFriendlyBooks, getCaterogyBooks}
