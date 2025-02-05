const { default: mongoose } = require("mongoose");
const { ObjectId, BSON } = require("mongodb");
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const sendEmail = require("../../lib/sendEmail");

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
  console.log("user er value is", user);
  try {
    const isExist = await User.findOne({ email: user?.email });
    if (!isExist) {
      return res.send({
        success: false,
        message: "Please Before SignUp",
      });
    }
    console.log(
      "isExist er password",
      isExist?.password,
      "current login request er password",
      user?.password
    );
    // Password comparison using bcrypt
    const passwordMatched = await bcrypt.compare(
      user?.password,
      isExist?.password
    );

    console.log(passwordMatched);
    if (!passwordMatched) {
      return res.send({
        success: false,
        message: "Credentials Error",
      });
    }

    res.send({
      success: true,
      user: isExist,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// get my profile information
const getMyProfileInfo = async (req, res) => {
  const email = req.params.email;
  console.log("user er value is", email);
  try {
    const result = await User.findOne({ email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error?.message);
  }
};

// new user added in db
const addeNewUser = async (req, res) => {
  const user = req.body;
  const userEmail = user?.email;
  console.log(user);
  try {
    const currentUser = await User.findOne({ email: userEmail });
    if (currentUser) {
      return res.send({
        success: false,
        message: "User Already Registerd!",
      });
    }
    await User.create(user);

    // wellcome message sent for signup bookvila
    await sendEmail(userEmail, {
      subject: "Welcome to Book Vila!",
      message: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
        <h1 style="font-size: 24px; font-weight: bold; color: #160078;">Welcome to Book Vila!</h1>
        <p style="font-size: 16px; font-weight: 600;">Dear ${user?.name},</p>
        <p style="font-size: 14px; line-height: 1.6;">
          Thank you for registering with Book Vila. Were excited to have you onboard and are pleased to inform you that your account has been successfully created.
        </p>
        <div style="margin: 20px 0;">
          <p style="font-size: 14px;">With your new account, you can:</p>
          <ul style="list-style-type: disc; padding-left: 20px; font-size: 14px; line-height: 1.6;">
            <li><strong>Log in to Your Dashboard:</strong> <a href="https://book-vila-client.vercel.app/" style="color: #2332c4; text-decoration: none;">Login Here</a></li>
     
          </ul>
        </div>
        <p style="font-size: 14px;">For any inquiries or support, feel free to contact us at <a href="mailto:bookvilabd@gmail.com" style="color: #2332c4; text-decoration: none;">bookvilabd@gmail.com</a>.</p>
        <p style="font-size: 14px; margin-top: 20px;">
          Thank you for choosing Book Vila. We look forward to providing you with the best book purchase experience!
        </p>
        <p style="font-size: 14px;">Sincerely,</p>
        <p style="font-size: 14px; font-weight: bold;">The Book Vila Team</p>
      <img src="https://i.postimg.cc/PxpwHK1k/Book-Vila-logo-removebg-preview.png"  alt="Book Vila logo"  width="200" height="200" />
      </div>
      `,
    }).then(() =>
      res.send({
        success: true,
        message: "Created Successfully",
      })
    );
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

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
  console.log(newObj, userEmail);

  try {
    const userInfo = await User.findOne({ email: userEmail });
    console.log(userInfo);

    // Password comparison using bcrypt
    const passwordMatched = await bcrypt.compare(
      newObj?.oldPass,
      userInfo?.password
    );

    console.log(passwordMatched);
    if (!passwordMatched) {
      return res.send({
        success: false,
        message: "Credentials Error",
      });
    }

    const hashdPass = await bcrypt.hashSync(
      newObj?.newPass,
      bcrypt.genSaltSync(10)
    ); // myPlaintextPassword er jaigai perameter er v dita hobe. ai v te user er deewa password ta asbe. saltRounds er jaigai koita charecter er moddhe salt hobe, sei charecter number dita hoi.

    const result = await User.updateOne(
      { email: userEmail },
      {
        $set: {
          password: hashdPass,
        },
      }
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

module.exports = {
  getAllUser,
  addeNewUser,
  getSingleUser,
  getMyProfileInfo,
  updateUserInfo,
  updatePass,
};
