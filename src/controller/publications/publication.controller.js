const { ObjectId } = require("mongodb");
const Publication = require("../../models/Publication");
const Books = require("../../models/Books");

const getPublications = async (req, res) => {
  try {
    const result = await Publication.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single publication with id
const getSinglePublication = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Publication.find({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single Publication all books
const getPublicationBooks = async (req, res) => {
  try {
    const { publicationId, searchQuery, page = 1 } = req.query;
    const limit = 12;
    if (!publicationId) {
      return res.status(400).json({ message: "Publication Id is required" });
    }
    const query = { publicationID: publicationId };

    if (searchQuery) {
      console.log(searchQuery);
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      console.log(searchQuery);
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

// add new Publication
const addNewPublication = async (req, res) => {
  const publicationObj = req.body;
  console.log(publicationObj);
  try {
    const result = await Publication.create(publicationObj);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete publication with _id
const deletePublication = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Publication.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a specific aithor with id
const updatePublication = async (req, res) => {
  const { id } = req.params; // Extract bookID from the URL
  const updatedData = req.body; // Extract updated data from the request body
  console.log(id, updatedData);
  try {
    const updatedPublication = await Publication.findOneAndUpdate(
      { _id: new ObjectId(id) }, // Filter: find the book by its bookID
      updatedData, // The data to update
      { new: true, runValidators: true } // Options: return the updated document and validate
    );

    if (!updatedPublication) {
      return res.status(404).json({ message: "PUblication not found" });
    }

    res.status(200).json(updatedPublication); // Send the updated book as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error message
  }
};

module.exports = {
  getPublications,
  getSinglePublication,
  getPublicationBooks,
  addNewPublication,
  deletePublication,
  updatePublication,
};
