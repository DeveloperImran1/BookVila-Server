const Authors = require("../../models/Authors");
const { ObjectId } = require('mongodb');
const Books = require("../../models/Books");

const getAllAuthors = async (req, res) => {
    try {
        const result = await Authors.find()
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getSingleWriter = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Authors.find({ authorID: id })
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


  // get single authors all books
const getAuthorBooks = async (req, res) => {
    try {
      const { authorId, searchQuery, page = 1 } = req.query;
      const limit = 12;
      if (!authorId) {
        return res.status(400).json({ message: "Ahthor Id is required" });
      }
      const query = { "authorInfo.authorID": authorId }
  
      if (searchQuery) {
        const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
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
  
  

module.exports = { getAllAuthors, getSingleWriter, getAuthorBooks };