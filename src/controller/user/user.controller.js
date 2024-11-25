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
      return res.send({
        success: false,
        message: "Please Before SignUp"
      })
    }
    console.log("isExist er password", isExist?.password, "current login request er password", user?.password)
    // Password comparison using bcrypt
    const passwordMatched = await bcrypt.compare(user?.password, isExist?.password);

    console.log(passwordMatched)
    if (!passwordMatched) {
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


// get my profile information
const getMyProfileInfo = async (req, res) => {
  const email = req.params.email;
  console.log("user er value is", email)
  try {
    const result = await User.findOne({ email });
    res.status(200).json(result);
  }
  catch (error) {
    res.status(500).json(error?.message);

  }
}

// new user added in db
const addeNewUser = async (req, res) => {
  const user = req.body;
  const userEmail = user?.email;
  console.log(user)
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

// Update user info
const updateUserInfo = async (req, res) => {
  const newObj = req.body;
  const userEmail = req?.params?.email;

  try {
    const result = await User.updateOne(
      { email: userEmail },
      { $set: newObj }, // Dynamically updates existing and adds new properties
      { new: true, upsert: true } // Options: Return updated document and insert if not found
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

// Update user pass
const updatePass = async (req, res) => {
  const newObj = req.body;
  const userEmail = req?.params?.email;
  console.log(newObj, userEmail)


  try {

    const userInfo = await User.findOne({ email: userEmail });
    console.log(userInfo)
  
    // Password comparison using bcrypt
    const passwordMatched = await bcrypt.compare(newObj?.oldPass, userInfo?.password);
  
    console.log(passwordMatched)
    if (!passwordMatched) {
      return res.send({
        success: false,
        message: "Credentials Error"
      })
    }
  
    const hashdPass = await bcrypt.hashSync(newObj?.newPass, bcrypt.genSaltSync(10))  // myPlaintextPassword er jaigai perameter er v dita hobe. ai v te user er deewa password ta asbe. saltRounds er jaigai koita charecter er moddhe salt hobe, sei charecter number dita hoi.

    
    const result = await User.updateOne(
      { email: userEmail },
      { $set: {
        password: hashdPass
      } },
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};



// const updatePass = async (req, res) => {
//   try {
//     const { oldPass, newPass } = req.body; // ফর্ম ডেটা
//     const userEmail = req.params.email; // URL থেকে ইমেইল
//     // ইউজার খুঁজে বের করা
//     const userInfo = await User.findOne({ email: userEmail });
//     if (!userInfo) {
//       return res.status(404).json({ success: false, message: "User not found." });
//     }

//     // পুরানো পাসওয়ার্ড ম্যাচ করা
//     const passwordMatched = await bcrypt.compare(oldPass, userInfo.password);
//     console.log(passwordMatched)
//     if (!passwordMatched) {
//       return res.status(400).json({ success: false, message: "Old password is incorrect." });
//     }

//     // নতুন পাসওয়ার্ড হ্যাশ করা
//     const hashedNewPass = bcrypt.hashSync(newPass, bcrypt.genSaltSync(10));

//     // পাসওয়ার্ড আপডেট করা
//     const result = await User.updateOne(
//       { email: userEmail },
//       { $set: { password: hashedNewPass } }
//     );

//     if (result.modifiedCount > 0) {
//       res.status(200).json({ success: true, message: "Password updated successfully." });
//     } else {
//       res.status(400).json({ success: false, message: "Failed to update password." });
//     }
//   } catch (error) {
//     console.error("Error updating password:", error); // কনসোল লগে বিস্তারিত এরর
//     res.status(500).json({ success: false, message: "Internal Server Error." });
//   }
// };



module.exports = { getAllUser, addeNewUser, getSingleUser, getMyProfileInfo, updateUserInfo, updatePass }