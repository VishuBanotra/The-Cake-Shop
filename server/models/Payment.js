import mongoose from "mongoose";

const schema = mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    deafult: Date.now,
  },
});

export const Payment = mongoose.model("Payment", schema);
