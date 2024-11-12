const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    photo: String,
    block: {
      type: String,
      enum: [true, false],
      default: false
    },
    password: {
      type: String,
      // required: true,
      set: (v) =>  bcrypt.hashSync(v, bcrypt.genSaltSync(10))  // myPlaintextPassword er jaigai perameter er v dita hobe. ai v te user er deewa password ta asbe. saltRounds er jaigai koita charecter er moddhe salt hobe, sei charecter number dita hoi.
    },
    notifications: [
      {
        type: { type: String, enum: ["order"]},
        message: { type: String },
        route: { type: String, default: null },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    role: {
      type: String, // Specify the type
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
