const { ObjectId } = require("mongodb");
const Category = require("../../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const result = await Category.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add new Categori
const addNewCategorie = async (req, res) => {
  const categoryObj = req.body;
  try {
    const result = await Category.create(categoryObj);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete category with _id
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Category.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a specific aithor with id
const updateCategory = async (req, res) => {
  const { id } = req.params; // Extract bookID from the URL
  const updatedData = req.body; // Extract updated data from the request body
  console.log(id, updatedData);
  try {
    const category = await Category.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category); // Send the updated book as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error message
  }
};

module.exports = {
  getAllCategories,
  addNewCategorie,
  deleteCategory,
  updateCategory,
};
