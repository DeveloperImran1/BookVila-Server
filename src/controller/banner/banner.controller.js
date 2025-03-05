const { ObjectId } = require("mongodb");
const Banner = require("../../models/Banner");
const Category = require("../../models/Category");

const getAllBanner = async (req, res) => {
  try {
    const result = await Banner.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add new banner
const addNewBanner = async (req, res) => {
  const image = req.body;
  try {
    const result = await Banner.create(image);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete banner with _id
const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Banner.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBanner,
  addNewBanner,
  deleteBanner,
};
