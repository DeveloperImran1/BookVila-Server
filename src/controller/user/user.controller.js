const {default: mongoose} = require("mongoose");
const {ObjectId, BSON} = require("mongodb");
const User = require("../../models/User");


// get all user
const getAllUser = async (req, res) => {
    try {
      const result = await User.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  module.exports = {getAllUser}