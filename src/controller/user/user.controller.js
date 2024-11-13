const { default: mongoose } = require("mongoose");
const { ObjectId, BSON } = require("mongodb");
const bcrypt = require('bcrypt');

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

// get single user for login
const getSingleUser = async (req, res) => {
  const user = req.body;
  console.log("user er value is", user)
  try {
    const isExist = await User.findOne({ email: user?.email });
    if (!isExist) {
    return  res.send({
        success: false,
        message: "Please Before SignUp"
      })
    }
    console.log("isExist er password", isExist?.password, "current login request er password", user?.password)
    // Password comparison using bcrypt
    const passwordMatched = await bcrypt.compare(user?.password, isExist?.password);

    console.log(passwordMatched)
    if(!passwordMatched){
     return res.send({
        success: false,
        message: "Credentials Error"
      })
    }

    res.send({
      success: true,
      user: isExist
    })
  }
  catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
}

// new user added in db
const addeNewUser = async (req, res) => {
  const user = req.body;
  const userEmail = user?.email;
  try {
    const currentUser = await User.findOne({ email: userEmail });
    if (currentUser) {
      return res.send({
        success: false,
        message: "User Already Registerd!"
      })
    }
    await User.create(user)
    res.send({
      success: true,
      message: "Created Successfully"
    })
  }
  catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
}


module.exports = { getAllUser, addeNewUser, getSingleUser }