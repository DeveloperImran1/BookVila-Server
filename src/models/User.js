
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    block: Boolean,
    password: {
      type: String,
      required: true,
    },
    notifications: [
      {
        type: { type: String, enum: ["order"]},
        message: { type: String, required: true },
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
