const { ObjectId } = require('mongodb');
const Publication = require('../../models/Publication');
const Books = require('../../models/Books');

const getPublications = async (req, res) => {
    try {
        const result = await Publication.find()
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  
// get single publication with id
const getSinglePublication = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const result = await Publication.find({ _id: new ObjectId(id) })
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



  // get single Publication all books
  const getPublicationBooks = async (req, res) => {
    try {
      const { publicationId, searchQuery, page = 1 } = req.query;
      const limit = 12;
      console.log(req.query)
      if (!publicationId) {
        return res.status(400).json({ message: "Publication Id is required" });
      }
      const query = { "publicationID": publicationId }
  
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

module.exports = { getPublications, getSinglePublication, getPublicationBooks };