import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : {
        cheeseCake: {
          quantity: 0,
          price: 350,
        },
        pineAppleCake: {
          quantity: 0,
          price: 350,
        },
        blackForestCake: {
          quantity: 0,
          price: 450,
        },
      },
  subTotal: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).subTotal
    : 0,
  tax: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).tax
    : 0,
  shippingCharges: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).shippingCharges
    : 0,
  total: localStorage.getItem("cartPrices")
    ? JSON.parse(localStorage.getItem("cartPrices")).total
    : 0,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = createReducer(initialState, {
  cheeseCakeIncrement: (state) => {
    state.cartItems.cheeseCake.quantity += 1;
  },
  pineAppleCakeIncrement: (state) => {
    state.cartItems.pineAppleCake.quantity += 1;
  },
  blackForestCakeIncrement: (state) => {
    state.cartItems.blackForestCake.quantity += 1;
  },
  cheeseCakeDecrement: (state) => {
    state.cartItems.cheeseCake.quantity -= 1;
  },
  pineAppleCakeDecrement: (state) => {
    state.cartItems.pineAppleCake.quantity -= 1;
  },
  blackForestCakeDecrement: (state) => {
    state.cartItems.blackForestCake.quantity -= 1;
  },

  calculatePrice: (state) => {
    state.subTotal =
      state.cartItems.cheeseCake.price * state.cartItems.cheeseCake.quantity +
      state.cartItems.pineAppleCake.price *
        state.cartItems.pineAppleCake.quantity +
      state.cartItems.blackForestCake.price *
        state.cartItems.blackForestCake.quantity;

    state.tax = state.subTotal * 0.18;
    state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
    state.total = state.subTotal + state.tax + state.shippingCharges;
  },
  emptyState: (state) => {
    state.cartItems = {
      cheeseCake: {
        quantity: 0,
        price: 350,
      },
      pineAppleCake: {
        quantity: 0,
        price: 350,
      },
      blackForestCake: {
        quantity: 0,
        price: 450,
      },
    };

    state.subTotal = 0;
    state.shippingCharges = 0;
    state.tax = 0;
    state.total = 0;
  },
  addShippingInfo: (state, action) => {
    state.shippingInfo = {
      hNo: action.payload.hNo,
      city: action.payload.city,
      state: action.payload.state,
      country: action.payload.country,
      pincode: action.payload.pincode,
      phoneNo: action.payload.phoneNo,
    };
  },
});
