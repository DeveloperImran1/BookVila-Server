const Book = require("../../models/Books");

// get all user
const getAllBooks = async (req, res) => {
    try {
      const result = await Book.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  module.exports = {getAllBooks}