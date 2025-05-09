const Authors = require("../../models/Authors");
const { ObjectId } = require("mongodb");
const Books = require("../../models/Books");

const getAllAuthors = async (req, res) => {
  try {
    const result = await Authors.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all author with serarch params and pagignation
const getAllAuthorsWithParams = async (req, res) => {
  try {
    const { searchQuery, page = 1 } = req.query;
    const limit = 12;

    const query = {};

    if (searchQuery) {
      // console.log(searchQuery)
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      query.name = { $in: regex };
    }

    const authors = await Authors.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalAuthors = await Authors.countDocuments(query);

    res.status(200).json({ authors, totalAuthors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleWriter = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Authors.find({ authorID: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single authors all books
const getAuthorBooks = async (req, res) => {
  try {
    const { authorId, searchQuery, page = 1 } = req.query;
    const limit = 12;
    if (!authorId) {
      return res.status(400).json({ message: "Ahthor Id is required" });
    }
    const query = { "authorInfo.authorID": authorId };

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

// getAll authors length
const getAuthorLength = async (req, res) => {
  try {
    const author = await Authors.find().countDocuments();

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add new author
const addNewAuthor = async (req, res) => {
  const authorObj = req.body;
  try {
    const result = await Authors.create(authorObj);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete author with _id
const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Authors.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a specific aithor with id
const updateAuthor = async (req, res) => {
  const { id } = req.params; // Extract bookID from the URL
  const updatedData = req.body; // Extract updated data from the request body
  console.log(id, updatedData);
  try {
    const updatedAuthor = await Authors.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Filter: find the book by its bookID
      updatedData, // The data to update
      { new: true, runValidators: true } // Options: return the updated document and validate
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(updatedAuthor); // Send the updated book as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error message
  }
};

module.exports = {
  getAllAuthors,
  getSingleWriter,
  getAuthorBooks,
  getAuthorLength,
  addNewAuthor,
  deleteAuthor,
  updateAuthor,
  getAllAuthorsWithParams,
};
