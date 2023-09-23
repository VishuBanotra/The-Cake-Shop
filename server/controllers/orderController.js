import { Order } from "../models/Order.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { instance } from "../server.js";
import { asyncError } from "../middlewares/errorMiddleware.js";
import crypto from "crypto";
import { Payment } from "../models/Payment.js";



// Req.user will be used here
export const placeOrder = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = req.user.id

  const orderOption = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  await Order.create(orderOption);

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully via Cash on Delivery",
  });
});


// Req.user will use here
export const placeOrderOnline = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
  } = req.body;

  const user = req.user.id;

  const orderOption = {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingCharges,
    totalAmount,
    user,
  };

  const options = {
    amount: Number(totalAmount) * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(201).json({
    success: true,
    order,
    orderOption,
  });
});

// Razorpay
export const paymentVerifivcation = asyncError(async (req, res, next) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    orderOption,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await Order.create({
      ...orderOption,
      paidAt: new Date(Date.now()),
      paymentInfo: payment._id,
    });

    res.status(201).json({
      success: true,
      message: `Order Placed Successfully. Payment ID: ${payment._id}`,
    });
  } else {
    next(new ErrorHandler("Payment Failed", 400));
  }
});


// Getting Orders 
export const getMyOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({
    user: req.user.id,
  }).populate("user", "name");

  if (orders.length) {
    res.status(200).json({
      success: true,
      orders,
    });
  } else res.send(next(new ErrorHandler("No Order found", 404)));
});

// Order Details
export const getOrderDetails = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name");

  if (!order) return next(new ErrorHandler("Invalid Order Id", 400));

  res.status(200).json({
    success: true,
    order,
  });
});

//Admin getting Orders 
export const getAdminOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});

// Order Processing
export const processOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Invalid Order Id", 400));

  if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus === "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Food Already Delivered"), 400);
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Status updated Successfully",
  });
});
