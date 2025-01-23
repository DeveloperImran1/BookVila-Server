const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  shippingMethod: {
    type: String,
  },
  cashOnDelivery: {
    type: String,
  },
  transitionId: {
    type: String,
  },
  hePay: {
    type: String,
  },
  cardType: {
    type: String,
  },
  transitionDate: {
    type: String,
  },
  payment: {
    type: String,
  },
  user: {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String },
    address: { type: String },
    thana: { type: String },
    district: { type: String },
    note: { type: String },
  },
  items: [
    {
      _id: false, // Prevent Mongoose from generating an extra _id field for each item
      bookId: { type: String, required: true },
      bookPhoto: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  totalPayment: {
    type: Number,
    required: true,
  },
  timestamps: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
