import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer(
  {},
  {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    paymentVerificationRequest: (state) => {
      state.loading = true;
    },
    paymentVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    paymentVerificationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);

export const oredrsReducer = createReducer(
  { orders: [] },
  {
    getMyOrdersRequest: (state) => {
      state.loading = true;
    },
    getMyOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getMyOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getOrderDetailsRequest: (state) => {
      state.loading = true;
    },
    getOrderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    getOrDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
