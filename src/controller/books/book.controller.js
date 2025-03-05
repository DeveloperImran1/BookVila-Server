const Authors = require("../../models/Authors");
const Books = require("../../models/Books");
const { ObjectId } = require("mongodb");
const Publication = require("../../models/Publication");

const getAllBooks = async (req, res) => {
  try {
    const {
      searchQuery,
      author,
      category,
      subject,
      minPrice,
      maxPrice,
      page,
      limit,
      // page = 1,
      // limit = 10,
    } = req.query;

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
const getAttributeBooks = async (req, res) => {
  try {
    const { attribute, searchQuery, page = 1 } = req.query;
    const limit = 12;
    // console.log(req.query)
    if (!attribute) {
      return res.status(400).json({ message: "Attribute is required" });
    }
    const query = { [attribute]: true };

    if (searchQuery) {
      // console.log(searchQuery)
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      query.bookName = { $in: regex };
    }

    const books = await Books.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBooks = await Books.countDocuments(query);

    res.status(200).json({ books, totalBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get similar books by category
const getCaterogyBooks = async (req, res) => {
  try {
    const { category, searchQuery, page = 1 } = req.query;
    const limit = 12;
    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }
    // Convert category to an array if it’s a string (to handle query strings like `?category=Novel&category=উপন্যাস`)
    const categories = Array.isArray(category) ? category : [category];

    // Create query with $in to match any value in the category array
    const query = { category: { $in: categories } };

    const books = await Books.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBooks = await Books.countDocuments(query);

    res.status(200).json({ books, totalBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get Budjet Friendly books
const getBudgetFriendlyBooks = async (req, res) => {
  try {
    const { searchQuery, page = 1 } = req.query;
    const limit = 12;

    const query = { price: { $lt: 250 } };

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      query.bookName = { $in: regex };
    }

    const books = await Books.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBooks = await Books.countDocuments(query);

    res.status(200).json({ books, totalBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getAll Books
const getBooks = async (req, res) => {
  try {
    const query = {};
    const { searchQuery } = req.query;
    if (searchQuery) {
      // console.log(searchQuery)
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      // console.log(searchQuery)
      query.bookName = { $in: regex };
    }
    const books = await Books.find(query);

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getAll Books length
const getBooksLength = async (req, res) => {
  try {
    const books = await Books.find().countDocuments();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add new book
const addNewBook = async (req, res) => {
  const bookObj = req.body;
  try {
    const result = await Books.create(bookObj);

    // get auitho info using authorID
    const authorInfo = await Authors.findOne({
      authorID: bookObj?.authorInfo?.authorID,
    });
    const updateAuthorInfo = await Authors.updateOne(
      { authorID: bookObj?.authorInfo?.authorID },
      {
        $push: {
          books: {
            bookID: bookObj?.bookID,
            title: bookObj?.bookName?.[0],
          },
        },
      }
    );

    // get publication info using publicationID
    const publicationInfo = await Publication.findOne({
      publicationID: bookObj?.publicationID,
    });

    const updatePublicationInfo = await Publication.updateOne(
      { publicationID: bookObj?.publicationID },
      {
        $push: {
          books: {
            bookID: bookObj?.bookID,
            title: bookObj?.bookName?.[0],
          },
        },
      }
    );

    console.log(
      "updateAuthorInfo",
      updateAuthorInfo,
      "updatePublicationInfo",
      updatePublicationInfo
    );

    if (
      updateAuthorInfo?.modifiedCount &&
      updatePublicationInfo?.modifiedCount
    ) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a specific book with id
const updateBook = async (req, res) => {
  const { id } = req.params; // Extract bookID from the URL
  const updatedData = req.body; // Extract updated data from the request body
  try {
    const updatedBook = await Books.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Filter: find the book by its bookID
      updatedData, // The data to update
      { new: true, runValidators: true } // Options: return the updated document and validate
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook); // Send the updated book as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error message
  }
};

// delete a book with _id
const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await Books.deleteOne({ _id: new ObjectId(bookId) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  getAttributeBooks,
  getBooks,
  getBudgetFriendlyBooks,
  getCaterogyBooks,
  getBooksLength,
  addNewBook,
  deleteBook,
  updateBook,
};
