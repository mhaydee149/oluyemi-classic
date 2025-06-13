const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Associate orders with registered users
  },
  customerEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Price per unit at the time of order
      image: { type: String }, // Optional image URL
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentReference: {
    type: String,
    required: true,
    unique: true, // From Paystack or other payment gateway
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    // Optional, can be expanded later
    street: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  // Consider adding other fields if necessary, e.g., deliveryStatus, trackingNumber
});

module.exports = mongoose.model('Order', orderSchema);
